import SQLHelper from './../util/SQLHelper';

function fixOldVersion(myStudyWord, myWordBook) {
    let tasks = [];
    if(myStudyWord){
        Object.values(myStudyWord).forEach(word=>{
            let name = word.name;
            let is_remember = word.isRemember||0;
            let is_temp_remember = word.isTempRemember ||is_remember;
            let create_time = word.createTime || 0;
            let last_read_time = word.lastReadTime || create_time;
            let remember_times = word.rememberTimes || 0;
            let first_remember_time = word.firtstRememberTime||0;
            let remember_time = first_remember_time;
            tasks.push(SQLHelper.insertOrReplace(
                'user_study_word',
                ['name','is_remember','is_temp_remember','last_read_time','create_time','remember_times','first_remember_time','remember_time'],
                [name,is_remember,is_temp_remember,last_read_time,create_time,remember_times,first_remember_time,remember_time],
            ));
        });
    }
    if(myWordBook){
        Object.values(myWordBook).forEach(book=>{
            let name = book.name;
            let count = book.count||0;
            let position = book.position ||0;
            let current_word = book.currentWord || 'null';
            let create_time = book.createTime || 0;
            let last_read_time = book.lastReadTime || create_time;

            tasks.push(SQLHelper.insertOrReplace(
                'user_word_book ',
                ['name','count','position','current_word','create_time','last_read_time'],
                [name,count,position,current_word,create_time,last_read_time],
            ));
        });
    }
    return Promise.all(tasks);
   
}

function appInit(myStudyWord, myWordBook,word) {
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
    return Promise.all(tasks).then(() => {
        return fixOldVersion(myStudyWord, myWordBook).then(
            () => {
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