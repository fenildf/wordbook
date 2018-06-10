import SQLite from 'react-native-sqlite-storage';

let database;

var readyPromise;

function ready() {
    if (database) {
        return Promise.resolve();
    }
    if (readyPromise) {
        return readyPromise;
    } else {
        readyPromise = new Promise(function (resolve, reject) {
            database = SQLite.openDatabase(
                { name: "data", createFromLocation: "~data/database.db" },
                function(){
                    resolve();
                    readyPromise = null;
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
}

function executeSql(sql, data = []) {
    return ready().then(() => new Promise((resolve, reject) => {
        database.transaction(tx => {
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
                data.map(v=>'"'+v+'"').join(',') +
                ")";

    return executeSql(sql);
}


export  default{
    executeSql,
    createTable,
    insertOrReplace
}