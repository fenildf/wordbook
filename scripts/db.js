'use strict'

const SQLITE = require('sqlite3').verbose();

const fs = require('fs');
/**
 * 创建db,并移到app目录下
*/

const PATH = 'wordbook/database.db';

if (fs.existsSync(PATH)) {
    fs.unlinkSync(PATH)
}


const db = new SQLITE.Database(PATH);

const tables = [];

const 

tables.push({
    name: 'books',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null'
    ]
});

tables.push({
    name: 'words',
    column: [
        'id integer primary key autoincrement not null',
        'book_id integer not null',
        'name text not null',
        'section_name text not null',
    ]
});
function getColumn(item) {
    return item.match(/^[\S]*?(?=\s)/)[0];
}
db.serialize(function () {
    tables.forEach(function (table) {
        db.run("CREATE TABLE IF NOT EXISTS " + table.name + "(" +
            table.column.join(',') +
            ");");
        if (table.source) {
            let columns =table.column;
            let update = db.prepare("INSERT OR REPLACE  INTO " +
                table.name +
                "(" + columns.join(',') +
                ") VALUES (" +
                table.column.map(function () {
                    return '?'
                }).join(',') +
                ")"); //
            table.source.forEach(function (item, k) {
                update.run.apply(update, columns.map(function (c) {
                    return item[c];
                }));
            });
            update.finalize();
        }
    });
})

db.close(function(){

    const ANDROID_DB_PATH = 'wordbookapp/android/app/src/main/assets/data/database.db';
    const IOS_DB_PATH = 'wordbookapp/ios/shici/data/database.db';
    var input = fs.createReadStream(PATH);
    var output1 = fs.createWriteStream(ANDROID_DB_PATH);
    var output2 = fs.createWriteStream(IOS_DB_PATH);

    input.pipe(output1);
    input.pipe(output2);
})
