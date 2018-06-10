const fetch = require('./fetch');
const bookurls = require('./url.books');
const fs = require('fs');
const path = require('path');

const SEP = path.sep;

const BOOK_PATH = 'wordbooks';
const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';

function bookPath(name){
    return BOOK_PATH+SEP+name+'.json';
}
function removeIfExist(path){
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

function Item(name,children){
    let item = {
        name
    }
    if(children){
        item.children = children;
    }
    return item;
}
function seekItems(items,childrenHTML){
    return items.map((item)=>{
        let id = item.match(/#panel[\d]{1,}/)[0];
        let name = item.match(/(?=>).*?(?=<)/)[0].replace('>','');
        let children = childrenHTML[id.match(/[\d]{1,}/)[0]-1].match(/<a href="[\w\+\-]*?\.html" class="inlink">[-\w\s]*?<\/a>/gi);
        return Item(name,children.map((child,i)=>{
            return Item(child.match(/>[\w\s-]*?(?=<)/)[0].replace('>',''));
        }));
    });

}
function book(classify,name,html){
    try{
        let items = html.match(/<a href="#panel[\d]{1,}" class="inlink">[\s\S]*?<\/a>/gi);
        let childrenHTML = html.match(/<ul class="txtlist arrow">[\s\S]*?<\/ul>/gi).slice(1);
        let children = seekItems(items,childrenHTML);
        let book = {
            name,
            classify,
            children
        };
        let bPath = bookPath(classify+'-'+name);
        fs.createWriteStream(bPath).end(JSON.stringify(book,null,'\t'));

    }catch(e){
        console.log(e.message,name)
    }
}

bookurls.forEach(function(item,i){
    // if(i!==0){
    //     return;
    // }
    let {
        name,
        classify,
        url
    } = item;
    fetch(url,{headers:{'user-agent':USER_AGENT}}).then(function(response){
        response.text().then(function(html){
            book(classify,name,html);
        });
    })
})