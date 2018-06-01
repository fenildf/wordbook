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

function getData(type) {
    let sqlString;

    switch (type) {
        case 'books':
            sqlString = `select * from books as b`;
            return getDataBySql(sqlString)
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
    getState($payload) {
        return getData

    }
}


export default WordsProvider;