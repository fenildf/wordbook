const fetch = require('./fetch');
const bookurls = require('./url.books');
const fs = require('fs');
const path = require('path');

const SEP = path.sep;

const BOOK_PATH = 'wordbooks';
function removeIfExist(path){
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

function book(name,html){

}

bookurls.forEach(function(item){
    let {
        name,
        url
    } = item;
    fetch(url).then(function(response){
        response.text().then(function(html){
            book(name,html);
        });
    })
})