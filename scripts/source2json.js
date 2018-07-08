const fs = require('fs');

const SOURCE_DIR = 'scripts/source';

const WORDBOOK_DIR = 'wordbooks';

const sources = fs.readdirSync(SOURCE_DIR);
const book = require('./Book');


function parseSource(text) {
    let lines = text.split('\n');
    let b;
    let children;
    let onBookHeader = false;
    for (let i = 0, l = lines.length; i < l; i++) {
        let line = lines[i];
        if(!line||/^\s+$/.test(line)){
            continue;
        }
        line = line.trim();
        let c0=line[0];
        let c1=line[1];
        if(c0=='#'){
            if(c1!='#'){
                let info = line.slice(1).split(':');
                if(!onBookHeader){
                    if(b){
                        saveBook(b);
                    }
                    b = book.Book();
                    onBookHeader = true;
                }
                b[info[0]]=info[1];
            }else{
                children = [];
                onBookHeader = false;
                b.children.push(book.Item(line.slice(2),children));
            }
        }else{
            onBookHeader = false;
            line.split(',').forEach((word)=>{
                children.push(word.trim());
            })
        }
    }
    saveBook(b)

}

function saveBook(book){
    let path = 'wordbooks/'+book.classify+'-'+book.name+'.json';
    fs.createWriteStream(path).end(JSON.stringify(book,null,'\t'));
}

function readText(path){
    return fs.readFileSync(path).toString();
}

sources.forEach((source)=>{
    parseSource(readText(SOURCE_DIR+'/'+source))
})
