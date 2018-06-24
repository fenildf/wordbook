import SQLHelper from './../util/SQLHelper';
import words from './../asserts/words';

function fixOldVersion(myStudyWord, myWordBook) {
    let tasks = [];
    if (myStudyWord) {
        Object.values(myStudyWord).forEach((word, i) => {
            let name = word.name;
            let is_remember = word.isRemember || 0;
            let is_temp_remember = word.isTempRemember || is_remember;
            let create_time = word.lastReadTime || 0;
            let last_read_time = word.lastReadTime || create_time;
            let remember_times = word.rememberTimes || 0;
            let first_remember_time = word.firtstRememberTime || 0;
            let remember_time = first_remember_time;
            tasks.push(SQLHelper.insertOrReplace(
                'user_study_word', ['name', 'is_remember', 'is_temp_remember', 'last_read_time', 'create_time', 'remember_times', 'first_remember_time', 'remember_time'], [name, is_remember, is_temp_remember, last_read_time, create_time, remember_times, first_remember_time, remember_time],
            ));
        });
    }
    if (myWordBook) {
        Object.values(myWordBook).forEach(book => {
            let name = book.name;
            let count = book.count || 0;
            let position = book.position || 0;
            let current_word = book.currentWord || 'null';
            let create_time = book.createTime || 0;
            let last_read_time = book.lastReadTime || create_time;
            tasks.push(SQLHelper.insertOrReplace(
                'user_word_book ', ['name', 'count', 'position', 'current_word', 'create_time', 'last_read_time'], [name, count, position, current_word, create_time, last_read_time],
            ));
        });
    }
    return Promise.all(tasks);

}

let time = Date.now();

function fillTableWithBook() {
    let iterator = words.iterator();
    let book = iterator.next();
    let tasks = [];
    const bookSql = 'insert or ignore into books(name,book_classify) values(?,?)';
    const sectionSql = 'insert or ignore into sections(name,book_name,book_classify) values(?,?,?)';
    const wordSql = 'insert or ignore into words(name,book_name,section_name,book_classify) values(?,?,?,?)';
    while (book!=null) {
        tasks.push((function(book){
            return SQLHelper.transaction(function (tx) {
                let i = 1,
                    l = book.length
                let bookname, classify, sectionname, temp = '';
                for (; i < l; i++) {
                    let c = book[i];
                    if (c == '#') {
                        classify = temp;
                        temp = '';
                        i++;
                        break;
                    } else {
                        temp += c;
                    }
                }
                for (; i < l; i++) {
                    let c = book[i];
                    if (c == '#') {
                        bookname = temp;
                        temp = '';
                        i++;
                        break;
                    } else {
                        temp += c;
                    }
                }
                tx.executeSql(bookSql, [bookname, classify], () => {}, (err) => console.log(err,));
                for (; i < l; i++) {
                    let c = book[i];
                    if (c == ':') {
                        sectionname = temp;
                        tx.executeSql(sectionSql, [sectionname,bookname, classify], () => {}, (err) => console.log(err));
                        i++;
                        temp = '';
                    } else if(c == ','){
                        tx.executeSql(wordSql,[temp,bookname,sectionname,classify], () => {}, (err) => console.log(err));
                        temp = '';
                        i++;
                    } if (c == '#') {
                        temp = '';
                        i++;
                    } else {
                        temp += c;
                    }
                }
            });
        }(book)));
        book = iterator.next();
    };
    console.log(Date.now()-time,'========1')
    return tasks;
}

function appInit(myStudyWord, myWordBook, word, dbversion) {
    let tasks = [];
    tasks.push(SQLHelper.createTable('user_study_word', [
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

    ]));
    tasks.push(SQLHelper.createTable('user_word_book', [
        'id integer primary key autoincrement not null',
        'name text not null UNIQUE',
        'count integer',
        'position integer',
        'current_word text',
        'create_time interger not null',
        'last_read_time interger not null',
        'user_id default(1)'
    ]));
    if (dbversion !== words.version) {
        tasks = tasks.concat(fillTableWithBook());
    }
    return Promise.all(tasks).then(() => {
        return fixOldVersion(myStudyWord, myWordBook).then(
            () => {
                console.log(Date.now()-time,'========2')
                return {
                    init: true
                }
            }
        )
    });

}

function appNavigate($payload) {
    return $payload();

}
export default {
    appInit,
    appNavigate
}