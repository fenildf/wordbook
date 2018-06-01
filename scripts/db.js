'use strict'

const SQLITE = require('sqlite3').verbose();

const fs = require('fs');
/**
 * 创建db,并移到app目录下
*/

const PATH = 'wordbooks/database.db';

if (fs.existsSync(PATH)) {
    fs.unlinkSync(PATH)
}



const files = fs.readdirSync('wordbooks');

const tables = [];

const books = [];
const sections = [];
const words = [];

files.forEach(function(file){
    if(/\.json$/.test(file)){
        let data = JSON.parse(fs.readFileSync('wordbooks/'+file));
        let bookname = data.name;
        books.push({name:bookname});
        data.children.forEach(function(section){
            let sectionname = section.name;
            sections.push({name:sectionname,book_name:bookname});
            section.children.forEach(function(word){
                words.push({section_name:sectionname,book_name:bookname,name:word.name});
            })
        });
        
    }
});
tables.push({
    name: 'books',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null'
    ],
    source:books
});

tables.push({
    name: 'sections',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null',
        'book_name text not null'
    ],
    source:sections
});
tables.push({
    name: 'words',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null',
        'book_name text not null',
        'section_name text not null'
    ],
    source:words
});

const db = new SQLITE.Database(PATH);

function getColumn(item) {
    return item.match(/^[\S]*?(?=\s)/)[0];
}
db.serialize(function () {
    tables.forEach(function (table) {
        db.run("CREATE TABLE IF NOT EXISTS " + table.name + "(" +
            table.column.join(',') +
            ");");
        if (table.source) {
            let columns =table.column.map(function (item) {
                return getColumn(item);
            });
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
