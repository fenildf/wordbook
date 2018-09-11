import SQLite from 'react-native-sqlite-storage';

let userdb;

let readyPromise;
let isReady = false;
const WORD_DB_NAME = 'wordbook';
const USER_DB_NAME = 'word';

function openDatabase() {
    return new Promise((resolve) => {
        userdb = SQLite.openDatabase(
            //历史原因 userdb name是word
            { name: USER_DB_NAME, createFromLocation: "~data/database.db" },
            function () {
                worddb = SQLite.openDatabase(
                    { name: WORD_DB_NAME, createFromLocation: '~data/word.db' },
                    function () {
                        userdb.attach(WORD_DB_NAME, 'wordbook', function () {
                            resolve();
                        });
                    },
                    function () {

                    })
            },
            function () {

            }
        )
    });
}
function deleteDatabase() {
    return new Promise((resolve, reject) => {
        SQLite.deleteDatabase({ name: WORD_DB_NAME }, () => {
            resolve();
        }, function () {
            resolve();
        });
    })
}

function ready() {
    if (isReady) {
        return Promise.resolve();
    }
    if (readyPromise) {
        return readyPromise;
    } else {
        readyPromise = openDatabase();
        return readyPromise;
    }
}
function error(err) {
    console.log('execute sql err:', err);
    alert(err.message);
}

function executeSql(sql, data = []) {
    return ready().then(() => new Promise((resolve, reject) => {
        let db = userdb;
        db.transaction(tx => {
            tx.executeSql(
                sql,
                data,
                (tx, results) => {
                    resolve(results)
                },
                error
            )
        }, error);
    }))
}

function createTable(name, column) {
    let sql = "CREATE TABLE IF NOT EXISTS " + name + "(" + column.join(',') + ");";
    return executeSql(sql);
}
function insertOrReplace(tableName, columns, data) {
    let sql = "INSERT OR REPLACE INTO " +
        tableName +
        "(" + columns.join(',') +
        ") VALUES (" +
        data.map(v => {
            if (/\(.*?\)/.test(v)) {
                return v;
            } else {
                return '"' + v + '"';
            }
        }).join(',') +
        ")";

    return executeSql(sql);
}
function transaction(fn) {
    return ready().then(() => new Promise((resolve, reject) => {
        let db = userdb;
        db.transaction(tx => {
            fn(tx);
        }, error, resolve);
    }))
}
function insertOrReplace2(tableName, columns, data) {
    let sql = "INSERT OR REPLACE INTO " +
        tableName +
        "(" + columns.join(',') +
        ") VALUES (" +
        data.join(',') +
        ")";

    return executeSql(sql);
}

function insertOrIgnore(tableName, columns, data) {
    let sql = "INSERT OR IGNORE INTO " +
        tableName +
        "(" + columns.join(',') +
        ") VALUES (" +
        data.map(v => '"' + v + '"').join(',') +
        ")";

    return executeSql(sql);
}
function remove(tableName, condition) {
    let sql = 'DELETE FROM ' + tableName + ' where ' + condition;
    return executeSql(sql);
}

function update(tableName, values, condition) {
    let sql = 'UPDATE ' + tableName + ' SET ' + values + ' WHERE ' + condition;
    return executeSql(sql);
}
export default {
    executeSql,
    createTable,
    insertOrReplace,
    insertOrReplace2,
    insertOrIgnore,
    remove,
    transaction,
    deleteDatabase,
    ready,
    update
}