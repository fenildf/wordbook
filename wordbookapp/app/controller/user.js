function addBook($payload, $persist) {
    let books = $payload();
    let userWordBook = {

    }
    let now = Date.now();
    for (let name in books) {
        if (userWordBook[name]) {
            continue;
        } else {
            let book = books[name];
            userWordBook[name] = {
                name: book.name,
                count: book.count,
                createTime: now,
                lastReadTime: now,
                position: 0,
                currentWord: ''
            }
        }

    }
    $persist('word', { items: Object.values(userWordBook), type: 'wordBook' });
    return {
        ok: true
    }
}


function getBooks(word) {
    return word('wordBook').then((books) => {
        return {
            books
        }
    })

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

function isTempRemember(studyWord, now) {
    return isRealRemember(studyWord, now) || (now - studyWord.firstRememberTime < TEMP_TIME_INTERVAL);
}
function isRealRemember(studyWord, now) {
    return studyWord.isRemember ||
        (studyWord.isTempRemember &&
            studyWord.rememberTimes > 3 &&
            (now - studyWord.firstRememberTime > THREE_DAY_MILLISECONDS));
}
function markWord($payload, $persist) {
    let payload = $payload();
    let now = Date.now();

    let book = {
        name: payload.bookName,
        lastReadTime: now
    };
    let word = payload.word;
    let isRemember = payload.isRemember;
    let wordName = word.name;
    let studyWord = {
        name: wordName,
        name: word.name,
        isRemember,
        isTempRemember: isRemember,
        lastReadTime: now,
    };

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
            if (!studyWord.rememberTimes || studyWord.rememberTimes === 0) {
                studyWord.rememberTimes = 0;
                studyWord.firstRememberTime = now;
            }
            studyWord.rememberTimes++;
            if (isRealRemember(studyWord, now)) {
                studyWord.isRemember = true;
            }
        } else {
            studyWord.isRemember = false;
            studyWord.isTempRemember = false;
            studyWord.firstRememberTime = 0;
            studyWord.rememberTimes = 0;
        }
    }

    $persist('myStudyWord', myStudyWord);
}
export default {
    addBook,
    getBooks,
    markWord,
    isRealRemember,
    isTempRemember
}