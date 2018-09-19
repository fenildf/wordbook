function addBook($payload, $update) {
    let books = $payload;
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
                lastReadTime: now,
                position: 0,
                currentWord: ''
            }
        }

    }
    $update('word', 'wordBookAdd', { items: Object.values(userWordBook) });
    return {
        ok: true
    }
}
function removeBooks($payload, $update) {
    let books = $payload;
    let userWordBook = {

    }
    for (let name in books) {
        if (userWordBook[name]) {
            continue;
        } else {
            let book = books[name];
            userWordBook[name] = {
                name: book.name,
                removed: true
            }
        }
    }
    let userWordBookArray = Object.values(userWordBook);
    if (userWordBookArray.length < 1) {
        return {
            ok: false,
            message: '请选择要移除的单词本'
        }
    }
    $update('word', 'wordBookRemove', { items: userWordBookArray });
    return {
        ok: true
    }
}
/**
 * 
 * @param {*} word 
 * @deprecated 准备移除,修改这部分的获取逻辑
 */
function getBooks(word) {
    return word('wordBook').then((books) => {
        return {
            books
        }
    })

}

function getCustomizedBooks(word) {
    return word('wordCustomizedBook').then((books) => {
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
function markWord($payload, $update) {
    let payload = $payload;
    let now = Date.now();

    let word = payload.word;
    let isRemember = payload.isRemember;
    let studyWord = {
        name: word.name,
        isTempRemember: isRemember,
        lastReadTime: now,
    };

    $update('word', 'userStudyWord', { items: [studyWord] });
}
function removeWord($payload, $update) {
    let payload = $payload;
    let word = {
        name: payload.name,
    };
    $update('word', 'userWordRemove', { items: [word] });
}
function editWord($payload, $update) {
    let payload = $payload;
    let word = {
        oldName: payload.oldName,
        name: payload.name
    }
    $update('word', 'userWordEdit', { word });
}
export default {
    addBook,
    getBooks,
    markWord,
    isRealRemember,
    isTempRemember,
    getCustomizedBooks,
    removeBooks,
    removeWord,
    editWord
}