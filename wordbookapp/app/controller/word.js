
import user from './user';

function getClassify(word,myWordBook){
    return getBooks(word,myWordBook).then(state=>{
        let books = state.books;
        let classify = {};
        books.forEach(book=>{
            let items = classify[book.classify]||{
                children:[],
                name:book.classify
            };
            items.children.push(book);
            classify[book.classify] = items;
        });
        return {classify:Object.values(classify)};

    });
}
function getBooks(word) {
    return word('books',{unselect:true}).then((books) => {
        return {
            books
        };
    });
}
function getSections(word, $payload) {
    let payload = $payload();

    return word('sections', payload).then((sections) => {
        return { sections };
    });

}

function getWords(word,myStudyWord,$payload) {
    let payload = $payload();
    myStudyWord = myStudyWord ||{};
    let studyWords = Object.values(myStudyWord);
    let now = Date.now();
    if(payload.bookName === '我的单词本'){
       return {words:studyWords};
    }else if(payload.bookName === '我的生词本'){
        return {words:studyWords.filter(word=>{
            return !user.isTempRemember(word,now);
        })};
    }
    return word('words', payload).then((words) => {
        return { words };
    });
}

function getMeaning(meaning,$payload){
    let payload = $payload();
    return meaning(payload).then(response=>{
        return {meaning:response};
    })
}
export default {
    getBooks,
    getSections,
    getWords,
    getMeaning,
    getClassify
}