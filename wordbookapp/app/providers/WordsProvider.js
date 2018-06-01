'use strict'
import {Provider} from 'febrest';
import SQLiteHelper from './../util/SQLHelper';

function executeSql(sql) {
    return SQLiteHelper.executeSql('user', sql);
}

function updateSql(table_name, data, keys) {
    return data.map(function (item) {
        return `insert or replace into ${table_name} (${keys.join(',')}) values (${item.join(',')})`;
    })
}

function removeSql(table_name, data, condition) {
    if(data&&data.length>0){
        return [
            `DELETE from ${table_name} where ${data.map(item=>condition(item)).join(' or ')}`
        ]
    }else{
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

const BOOK_COLUMN_MAP = ['id', 'name'];

const SECTION_COLUMN_MAP = ['id', 'name', 'book_name'];

const WORD_COLUMN_MAP = ['id', 'name', 'section_name', 'book_name'];


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
const handlers = {
    collection: {
        setState: function () {

        },
        getState: function (state,payload) {
            const sqlString = `select c.id as cid,shi.id as sid,shi.content as content,c.title as title,c.age as age,c.authot as author from collection as c
                                inner join content.shi as shi on shi.id = c.content_id
                                 where user_id = ${payload.user_id || 1} and collection_id = ${payload.id}
                                `;
            return executeSql(sqlString).then((results)=>{
                let rows = results.rows;
                let len = rows.length;
                let collection = [];
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    item.content = JSON.parse(item.contnet)
                    collection.push(item);
                }
                return collection;
            });
        }
    },
    collectionList: {
        setState: function (state) {
            const table_name = 'collection_list';
            
            if (!state) {
                return;
            }
            let { remove, update } = classify(state, commonCondition, COLLECTION_LIST_COLUMN_MAP);
            let sqlString = updateSql(table_name, update, COLLECTION_LIST_COLUMN_MAP).concat(removeSql(table_name, remove, removeCondition)).join(' union ');
            executeSql(sqlString);

        },
        getState: function (state, payload) {
            const sqlString = `select * from collection_list as clist  where user_id = ${payload.id || 1}`;
            const sqlString2 = `select count(collection_id),collection_id from collection  where user_id = ${payload.id || 1}`;
            let list,countList;
            return executeSql(sqlString2).then(function (results) {
                let rows = results.rows;
                let len = rows.length;
                countList = {};
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    countList[item.collection_id] = item.count;
                }
                return executeSql(sqlString);
            }).then(function(results){
                let rows = results.rows;
                let len = rows.length;
                list = [];
                for (let i = 0; i < len; i++) {
                    let item = rows.item(i);
                    item.count = countList[item.id]||0;
                    list.push(item);
                }
                return list;
            })
        }
    }
}

function setState(type, state) {
    var tablename = state.type;
    let data = state.data;
}
function getState(state, payload) {

}
class WordsProvider extends Provider {
    sourceType: string;
    constructor(config) {
        super(config);
        this.state = config.state || {};
        this.sourceType = config.sourceType;
    }
    setState() {
        return;
    }
    getState($payload) {
        let payload = $payload()||{};
        return handlers[this.sourceType].getState(this.state, payload);
    }
}


export default WordsProvider;