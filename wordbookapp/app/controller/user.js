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
                position:0
            }
        }
        
    }
    $persist('myWordBook',myWordBook);
    return {
        ok:true
    }
}


function getBooks(myWordBook){
    myWordBook = myWordBook||{};
    return {
        books:Object.values(myWordBook)
    }
}
export default {
    addBook,
    getBooks
}