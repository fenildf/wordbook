const fetch = require('./fetch');
const fs = require('fs');

const url = 'https://danci.911cha.com/';

const OUTPUT_FILE = 'scripts/url.books.js';

fetch(url).then(function (response) {
    response.text().then(function (html) {
        let booklinks = html.match(/<a href=".\/book_[\d]{1,}.html">.*?<\/a>/gi);
        if (booklinks) {
            let data = [];
            booklinks.forEach(function (item) {
                let link = url + item.match(/book_[\d]{1,}.html/)[0];
                let name = item.match(/>.*?</)[0].replace(/[><]/g,'');
                data.push({
                    url: link,
                    name
                })
            });

            let scriptString = 'module.exports = ' + JSON.stringify(data, null, '\t');
            if (fs.existsSync(OUTPUT_FILE)) {
                fs.unlinkSync(OUTPUT_FILE);
            }
            fs.createWriteStream(OUTPUT_FILE).end(scriptString);
        }
    });
});