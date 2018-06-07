function addBook($payload, myWordBook, $persist) {
    myWordBook = myWordBook || {};
    let books = $payload();
    for (let name in books) {
        if (myWordBook[name]) {
            continue;
        } else {
            let book = books[name];
            myWordBook[name] = {
                name: book.name,
                count: book.count,
                createTime: Date.now(),
                lastReadTime: Date.now,
                position: 0,
                currentWord: ''
            }
        }

    }
    $persist('myWordBook', myWordBook);
    return {
        ok: true
    }
}


function getBooks(myWordBook, myStudyWord) {
    myWordBook = myWordBook || {};
    myStudyWord = myStudyWord || {};
    let books = Object.values(myWordBook);
    let studyWords = Object.values(myStudyWord);
    let myStudyBook = myWordBook['我的单词本'] || {};
    let myNewBook = myWordBook['我的生词本'] || {};
    myStudyBook.count = studyWords.length;
    let now = Date.now();
    let count = studyWords.reduce(function (l, i) {
        if (!isTempRemember(i,now)) {
            l++;
        }
        return l;
    }, 0);
    myNewBook.count = count;
    // books.unshift(myStudyBook);
    // books.unshift(myNewBook);
    return {
        books
    }
}

/** 
 * 生词本规则
 * 1:记录上一次点击没有记住的时间
 * 2:比对时间，三天后至少有三次记住才会从生词本移除，否则暂时移除4小时之后又会出现在生词本
*/

/*position有问题*/

const TEMP_TIME_INTERVAL = 4 * 3600 * 1000;
const ONE_DAY_MILLISECONDS = 24 * 3600 * 1000;
const THREE_DAY_MILLISECONDS = 3 * ONE_DAY_MILLISECONDS;

function isTempRemember(studyWord,now){
    return isRealRemember(studyWord,now) || (now - studyWord.firstRememberTime < TEMP_TIME_INTERVAL);
}
function isRealRemember(studyWord, now) {
    return studyWord.isRemember ||
       (studyWord.isTempRemember &&
        studyWord.rememberTimes > 3 &&
        (now - studyWord.firstRememberTime > THREE_DAY_MILLISECONDS));
}
function markWord($payload, myWordBook, myStudyWord, $persist) {
    myWordBook = myWordBook || {};
    myStudyWord = myStudyWord || {};
    let payload = $payload();
    let book = myWordBook[payload.bookName];
    let word = payload.word;
    let isRemember = payload.isRemember;
    let wordName = word.name;
    let studyWord = myStudyWord[wordName];
    book.lastReadTime = now;
    let now = Date.now();
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    if (!studyWord) {
        studyWord = {
            name: word.name,
            isRemember,
            isTempRemember: isRemember,
            createTime: now,
            lastReadTime: now,
        }
        book.position++;
        myStudyWord[wordName] = studyWord;
    } else {
        studyWord.lastReadTime = now;
        studyWord.isTempRemember = isRemember;

        if (isRemember) {
            //首次记住的时间
            if(!studyWord.rememberTimes||studyWord.rememberTimes===0){
                studyWord.rememberTimes = 0;
                studyWord.firstRememberTime = now;
            }
            studyWord.rememberTimes++;
            if(isRealRemember(studyWord,now)){
                studyWord.isRemember = true;
            }
        } else {
            studyWord.isRemember = false;
            studyWord.rememberTimes = 0;
        }
    }

    $persist('myStudyWord', myStudyWord);
    $persist('myWordBook', myWordBook);
}
export default {
    addBook,
    getBooks,
    markWord,
    isRealRemember,
    isTempRemember
}