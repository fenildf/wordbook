function addBook($payload,myWordBook,$persist){
    myWordBook = myWordBook ||{};
    let books = $payload();
    for(let name in books){
        if(myWordBook[name]){
            continue;
        }else{
            let book = books[name];
            myWordBook[name] = {
                name:book.name,
                count:book.count,
                createTime:Date.now(),
                lastReadTime:Date.now,
                position:0,
                currentWord:''
            }
        }
        
    }
    $persist('myWordBook',myWordBook);
    return {
        ok:true
    }
}


function getBooks(myWordBook,myStudyWord){
    myWordBook = myWordBook||{};
    myStudyWord = myStudyWord ||{};
    let books = Object.values(myWordBook);
    let studyWords = Object.values(myStudyWord);
    let myStudyBook = myWordBook['我的单词本'];
    let myNewBook = myWordBook['我的生词本'];
    myStudyBook.count = studyWords.length;
    let count = studyWords.reduce(function(l,i){
        if(!i.isRemember){
            l++;
        }
        return l;
    },0);
    myNewBook.count = count;
    // books.unshift(myStudyBook);
    // books.unshift(myNewBook);
    return {
        books
    }
}

/*position有问题*/
function markWord($payload,myWordBook,myStudyWord,$persist){
    myWordBook = myWordBook ||{};
    myStudyWord = myStudyWord ||{};
    let payload = $payload();
    let book = myWordBook[payload.bookName];
    let word = payload.word;
    let isRemember = payload.isRemember;
    let wordName = word.name;
    let studyWord = myStudyWord[wordName];
    book.lastReadTime = now;
    let now = Date.now();
    if(!studyWord){
        studyWord = {
            name:word.name,
            isRemember,
            lastReadTime:now
        }
        book.position++;
        myStudyWord[wordName] = studyWord;        
        $persist('myStudyWord',myStudyWord);
    }else {
        studyWord.isRemember = isRemember;
        studyWord.lastReadTime = now;
        $persist('myStudyWord',myStudyWord);
    }
    $persist('myWordBook',myWordBook);
}
export default {
    addBook,
    getBooks,
    markWord
}