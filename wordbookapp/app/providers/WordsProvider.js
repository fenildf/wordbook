'use strict'
import { Provider } from 'febrest';
import SQLHelper from './../util/SQLHelper';

function executeSql(sql) {
    return SQLHelper.executeSql(sql);
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
function insertOrReplace(table, column, data) {
    return SQLHelper.insertOrReplace(table, column, data)
}
function insertOrReplace2(table, column, data){
    return SQLHelper.insertOrReplace2(table, column, data)
}
const TEMP_TIME_INTERVAL = 4 * 3600 * 1000;
const ONE_DAY_MILLISECONDS = 24 * 3600 * 1000;
const THREE_DAY_MILLISECONDS = 3 * ONE_DAY_MILLISECONDS;

function setData(data) {
    switch (data.type) {
        case 'wordBook':
            return data.items.map((book)=>{
                let name = book.name;
                let count = book.count;
                let position = book.position;
                let current_word = book.currentWord;
                let create_time = book.createTime||Date.now();
                let last_read_time = book.lastReadTime || create_time;
                let column = ['name', 'count', 'position', 'current_word','create_time','last_read_time'];
                let data =  [name, count, position, current_word, 
                            `ifnull((select create_time from user_word_book where name = '${name}'),${create_time})`,
                            last_read_time];
                
                return insertOrReplace(
                    'user_word_book ',
                    column,
                    data
                    
                );
            });  
        case 'userStudyWord':
            return data.items.map((word)=>{
                let name = word.name;
                let is_temp_remember = word.isTempRemember;
                let last_read_time = word.lastReadTime;
        
                
                return insertOrReplace2(
                    'user_study_word ',
                    ['name', 'is_remember', 'is_temp_remember', 'last_read_time', 'create_time','remember_times','first_remember_time','remember_time'],
                    [
                        `"${name}"`, 
                        is_temp_remember?`1`:'0',
                        is_temp_remember?'1':'0', 
                        `"${last_read_time}"`,
                        `ifnull(create_time,${last_read_time})` , 
                        is_temp_remember?`ifnull(remember_times,0)+1`:'0',
                        is_temp_remember?`ifnull(first_remember_time,${last_read_time})`:'null',
                        is_temp_remember?last_read_time:'null',
                    ],
                );
            });  

    }
}
function getData(type, payload) {
    let sql1, sql2;
    payload = payload;

    switch (type) {
        case 'wordSection':
            sql1 = 'select strftime("%Y-%m-%d",datetime("create_time"/1000,"unixepoch","localtime")) as section_name,count(name) as count from user_study_word group by section_name';
            return getDataBySql(sql1);
        case 'wordBook':
            sql1 = 'select name,count,create_time as createTime from user_word_book where name != "我的单词本" and name != "我的生词本"';
            return getDataBySql(sql1).then(data => {
                return getDataBySql('select count(name) as count from user_study_word').then(([book]) => {
                    data.unshift({
                        name: '我的单词本',
                        count: book.count
                    });
                    let now = Date.now();
                    return getDataBySql(`select count(name) as count from user_study_word 
                                        where is_remember != 'true' or 
                                        (remember_times>=1 and first_remember_time-${now}>${TEMP_TIME_INTERVAL})`).then(([book]) => {
                            data.unshift({
                                name: '我的生词本',
                                count: book.count
                            });
                            return data;
                        })
                })
            });
        case 'classify':
            sql1 = `select name from classify`
            return getDataBySql(sql1);
        case 'books':
            if (payload.unselect) {
                sql1 = `select book_name as name,book_classify as classify,count(book_name) as count from words
                        where book_name not in (select name from user_word_book) group by book_name ORDER BY classify`
            } else {
                sql1 = `select book_name as name,book_classify as classify,count(book_name) as count from words group by book_name ORDER BY classify`
            }
            return getDataBySql(sql1);
        case 'sections':
            if (payload.bookName === '我的生词本') {
                let now = Date.now();
                let dateString = 'strftime("%Y-%m-%d",datetime("create_time"/1000,"unixepoch","localtime"))';
                sql1 = `select ${dateString} as name,"我的生词本" as bookName,id,"我的生词本" as classify from user_study_word
                        where is_remember != 'true' or 
                        (remember_times>=1 and first_remember_time-${now}<${TEMP_TIME_INTERVAL})
                        group by ${dateString}`;
            } else if (payload.bookName === '我的单词本') {
                let dateString = 'strftime("%Y-%m-%d",datetime("create_time"/1000,"unixepoch","localtime"))';
                sql1 = `select ${dateString} as name,"我的单词本" as bookName,id,"我的单词本" as classify from user_study_word group by ${dateString}`;
            } else {
                sql1 = `select name,book_name as bookName,id,book_classify as classify from sections as b where book_name="${payload.bookName || '%'}"`;
            }
            return getDataBySql(sql1);
        case 'words':
            sql1 = `select * from words as b where book_name="${payload.bookName || '%'}" and section_name="${payload.sectionName || '%'}"`;
            return getDataBySql(sql1);


    }
}
class WordsProvider extends Provider {
    constructor(config) {
        super(config);
        this.state = config.state || {};
    }
    setState(state) {
        return setData(state);
    }
    getState() {
        return getData

    }
}


export default WordsProvider;