

function getBooks(word, myWordBook) {
    myWordBook = myWordBook || {};
    return word('books').then((books) => {
        return {
            books: books.filter(book => {
                return !myWordBook[book.name];
            })
        };
    });
}
function getSections(word, $payload) {
    let payload = $payload();

    return word('sections', payload).then((sections) => {
        return { sections };
    });

}

function getWords(word, $payload) {
    let payload = $payload();

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
    getMeaning
}