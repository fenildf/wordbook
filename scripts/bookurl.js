const fetch = require('./fetch');
const fs = require('fs');

const url = 'https://danci.911cha.com/';

const classify = [
    {
        name:'小学英语',
        url:'book_1001.html'
    },
    {
        name:'初中英语',
        url:'book_1002.html'
    },
    {
        name:'高中英语',
        url:'book_1003.html'
    },
    {
        name:'大学英语',
        url:'book_1004.html'
    },
    {
        name:'雅思托福',
        url:'book_1005.html'
    },
    {
        name:'成人考试',
        url:'book_1006.html'
    }
];

const OUTPUT_FILE = 'scripts/url.books.js';
const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';


let TASKS = [];
let data = [];

TASKS = classify.map(item=>{
    let classify = item.name;
    return fetch(url+item.url,{headers:{'user-agent':USER_AGENT}}).then(response=>{
        return response.text().then(html=>{
            let booklinks = html.match(/<a href=".\/book_[\d]{1,3}.html".*?>.*?<\/a>/gi);
            if (booklinks) {
                booklinks.forEach(function (item) {
                    let link = url + item.match(/book_[\d]{1,}.html/)[0];
                    let name = item.match(/>.*?</)[0].replace(/[><]/g,'');
                    data.push({
                        url: link,
                        name,
                        classify
                    })
                });
    
            }
        })
    })
});


Promise.all(TASKS).then(()=>{
    let scriptString = 'module.exports = ' + JSON.stringify(data, null, '\t');
    if (fs.existsSync(OUTPUT_FILE)) {
        fs.unlinkSync(OUTPUT_FILE);
    }
    fs.createWriteStream(OUTPUT_FILE).end(scriptString);
})
