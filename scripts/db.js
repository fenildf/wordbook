'use strict'

const SQLITE = require('sqlite3').verbose();

const fs = require('fs');
/**
 * 创建db,并移到app目录下
*/

const PATH = 'wordbooks/database.db';
const USER_DB_PATH = 'wordbooks/user.db';

function createDB(path,tables,targets){
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
    const db = new SQLITE.Database(path);
    db.serialize(function () {
        tables.forEach(function (table) {
            db.run("CREATE TABLE IF NOT EXISTS " + table.name + "(" +
                table.column.join(',') +
                ");");
            if (table.source) {
                let columns = table.column.map(function (item) {
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
    });
    db.close(function () {
    
        var input = fs.createReadStream(path);
        var output1 = fs.createWriteStream(targets[0]);
        var output2 = fs.createWriteStream(targets[1]);
    
        input.pipe(output1);
        input.pipe(output2);
    });
}


const files = fs.readdirSync('wordbooks');

const tables = [];
const userTables = [];

const books = [];
const sections = [];
const words = [];

files.forEach(function (file) {
    if (/\.json$/.test(file)) {
        let data = JSON.parse(fs.readFileSync('wordbooks/' + file));
        let bookname = data.name;
        let classify = data.classify;
        books.push({ name: bookname,book_classify:classify });
        data.children.forEach(function (section) {
            let sectionname = section.name;
            sections.push({ name: sectionname, book_name: bookname,book_classify:classify });
            section.children.forEach(function (word) {
                words.push({ section_name: sectionname, book_name: bookname, name: word.name,book_classify:classify });
            })
        });

    }
});
tables.push({
    name: 'classify',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null'
    ],
    source: [
        {
            name: '小学英语'
        },
        {
            name: '初中英语'
        },
        {
            name: '高中英语'
        },
        {
            name: '大学英语'
        },
        {
            name: '雅思托福'
        },
        {
            name:'成人考试'
        }
    ]
});
tables.push({
    name: 'books',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null',
        'book_classify text not null'
    ],
    source: books
});

tables.push({
    name: 'sections',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null',
        'book_name text not null',
        'book_classify text not null'
    ],
    source: sections
});
tables.push({
    name: 'words',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null',
        'book_name text not null',
        'section_name text not null',
        'book_classify text not null'
    ],
    source: words
});
userTables.push({
    name: 'user_word_book',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null UNIQUE',
        'count integer',
        'position integer',
        'current_word text',
        'create_time interger not null',
        'last_read_time interger not null',
        'user_id default(1)'
    ]
});

userTables.push({
    name: 'user_study_word',
    column: [
        'id integer primary key autoincrement not null',
        'name text not null UNIQUE',
        'is_remember  default(0)',
        'is_temp_remember  default(0)',
        'last_read_time interger not null',
        'create_time interger',
        'remember_times interger default(0)',
        'first_remember_time interger',
        'remember_time interger',
        'user_id default(1)'
    ],
});


function getColumn(item) {
    return item.match(/^[\S]*?(?=\s)/)[0];
}

createDB(PATH,tables,[
    'wordbookapp/android/app/src/main/assets/data/word.db',
    'wordbookapp/ios/wordbookapp/data/word.db']
);

createDB(USER_DB_PATH,userTables,[
    'wordbookapp/android/app/src/main/assets/data/database.db',
    'wordbookapp/ios/wordbookapp/data/database.db']
);