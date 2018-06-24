import SQLite from 'react-native-sqlite-storage';

let userdb;
let worddb;

var readyPromise;

function ready() {
    if (worddb) {
        return Promise.resolve();
    }
    if (readyPromise) {
        return readyPromise;
    } else {
        readyPromise = new Promise(function (resolve, reject) {
            //历史原因 userdb name是word
            userdb = SQLite.openDatabase(
                { name: "word", createFromLocation: "~data/database.db" },
                function(){
                    worddb = SQLite.openDatabase(
                       {name:'wordbook',createFromLocation:'~data/word.db'},
                       function(){
                            userdb.attach('wordbook', 'wordbook', function () {
                                resolve();
                                readyPromise = undefined;
                            });
                       },
                       function(){

                       }
                    )
                },
                function(){
                    
                }
            )
        });
        return readyPromise;
    }


}
function error(err){
    console.log('execute sql err:',err);
    alert(err.message);
}

function executeSql(sql, data = []) {
    let db = userdb;
    return ready().then(() => new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                data,
                (tx, results) => {
                    resolve(results)
                },
                error
            )
        },error);
    }))
}

function createTable(name,column){
   let sql =  "CREATE TABLE IF NOT EXISTS " + name + "(" +column.join(',') +");";
   return executeSql(sql);
}
function insertOrReplace(tableName,columns,data){
    let sql = "INSERT OR REPLACE INTO " +
                tableName +
                "(" + columns.join(',') +
                ") VALUES (" +
                data.map(v=>{
                    if(/\(.*?\)/.test(v)){
                        return v;
                    }else{
                        return '"'+v+'"';
                    }
                }).join(',') +
                ")";

    return executeSql(sql);
}
function transaction(fn){
    let db = userdb;
    return ready().then(() => new Promise((resolve, reject) => {
        db.transaction(tx => {
            fn(tx);
        },error,resolve);
    })) 
}
function insertOrReplace2(tableName,columns,data){
    let sql = "INSERT OR REPLACE INTO " +
                tableName +
                "(" + columns.join(',') +
                ") VALUES (" +
                data.join(',') +
                ")";

    return executeSql(sql);
}

function insertOrIgnore(tableName,columns,data){
    let sql = "INSERT OR IGNORE INTO " +
                tableName +
                "(" + columns.join(',') +
                ") VALUES (" +
                data.map(v=>'"'+v+'"').join(',') +
                ")";

    return executeSql(sql);
}
function remove(tableName,condition){
    let sql = 'DELETE FROM ' + tableName+' where '+condition;
    console.log(sql)
    return executeSql(sql);
}
export  default{
    executeSql,
    createTable,
    insertOrReplace,
    insertOrReplace2,
    insertOrIgnore,
    remove,
    transaction
}