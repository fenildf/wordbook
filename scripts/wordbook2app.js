//单词本修改转移到app目录下。

const fs = require('fs');
const PATH = 'wordbookapp/app/asserts';
const ASSERT_PATH = `${PATH}/words.js`;
const BOOK_DIR = 'wordbooks';

if(!fs.existsSync(PATH)){
    fs.mkdirSync(PATH);
}

const files = fs.readdirSync(BOOK_DIR);


function iterator(){
    let i = -1;
    let books;
    function next(){
        i++;
        if(!books){
            books = getBooks();
        }
        let book = books[i]
        if(book){
            return book;
        }else{
            books = null;
            return null;
        }
    }
    return {next};
};

let books = [];

files.forEach(path=>{
    if (/\.json$/.test(path)) {
        let data = JSON.parse(fs.readFileSync('wordbooks/' + path));
        let bookname = data.name;
        let classify = data.classify;
        let content = `#${classify}#${bookname}`;

        data.children.forEach(function (section) {
            let sectionname = section.name;
            content+= `#${sectionname}:`
            let words = section.children.map(function (word) {
                content+= `${word.name},`
            });
        });
        books.push(content);
    }
});

let fileContent = `
function getBooks(){
    return ${JSON.stringify(books)}
}
${iterator.toString()}
const version = ${Date.now()};
export default {
    iterator,
    version
}
`;

fs.createWriteStream(ASSERT_PATH).end(fileContent);



