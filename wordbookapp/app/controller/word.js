

function getBooks(word){
    return word('books').then((books)=>{
        return {books};
    });
}

export default {
    getBooks
}