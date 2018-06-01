

function getBooks(word){
    return word('books').then((books)=>{
        return {books};
    });
}
function getSections(word,$payload){
    let payload = $payload();

    return word('sections',payload).then((sections)=>{
        return {sections};
    });

}

function getWords(word,$payload){
    let payload = $payload();

    return word('words',payload).then((words)=>{
        return {words};
    });
}
export default {
    getBooks,
    getSections,
    getWords
}