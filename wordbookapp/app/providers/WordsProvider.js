'use strict'
import { Provider } from 'febrest';
import SQLiteHelper from './../util/SQLHelper';

function executeSql(sql) {
    return SQLiteHelper.executeSql(sql);
}

function updateSql(table_name, data, keys) {
    return data.map(function (item) {
        return `insert or replace into ${table_name} (${keys.join(',')}) values (${item.join(',')})`;
    })
}

function removeSql(table_name, data, condition) {
    if (data && data.length > 0) {
        return [
            `DELETE from ${table_name} where ${data.map(item => condition(item)).join(' or ')}`
        ]
    } else {
        return [];
    }

}
function classify(data, condition, map) {
    var update = [];
    var remove = [];
    data.forEach(function (item) {
        if (condition(item)) {
            update.push(map.map((key) => {
                if (!item[key]) {
                    return 'null';
                } else {
                    if (!/^[\d]+$/.test(item[key])) {
                        return `"${item[key]}"`;
                    }
                    return item[key];
                }
            }))
        } else {
            remove.push(map.map((key) => {
                return item[key];
            }))
        }
    });
    return {
        update,
        remove
    }
}

const BOOKS_COLUMN_MAP = ['id', 'name'];

const SECTIONS_COLUMN_MAP = ['id', 'name', 'book_name'];

const WORDS_COLUMN_MAP = ['id', 'name', 'section_name', 'book_name'];


function commonCondition(item) {
    if (item.itemRemove) {
        return false;
    } else {
        if (!item.created_time) {
            item.created_time = Date.now();
        }
        item.updated_time = Date.now();
        return true;
    }
}

function removeCondition(item) {
    return 'id = ' + item[0];
}
function getDataBySql(sql) {
    return executeSql(sql).then(function (results) {
        let rows = results.rows;
        let len = rows.length;
        let collection = [];
        for (let i = 0; i < len; i++) {
            let item = rows.item(i);
            collection.push(item);
        }
        return collection;
    })
}

function getCountBySql(){

}
function getData(type,payload) {
    let sql1,sql2;
    payload = payload;

    switch (type) {
        case 'classify':
            sql1 = `select name from classify`
            return getDataBySql(sql1);
        case 'books':
            sql1 = `select book_name as name,book_classify as classify,count(book_name) as count from words group by book_name`
            return getDataBySql(sql1);
        case 'sections':
            sql1 = `select name,book_name,id,book_classify as classify from sections as b where book_name="${payload.bookName||'%'}"`;
            return getDataBySql(sql1);
        case 'words':
            sql1= `select * from words as b where book_name="${payload.bookName||'%'}"`;
            return getDataBySql(sql1);

        
    }
}
class WordsProvider extends Provider {
    constructor(config) {
        super(config);
        this.state = config.state || {};
    }
    setState() {
        return;
    }
    getState() {
        return getData

    }
}


export default WordsProvider;