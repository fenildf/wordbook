'use strict'
function Book(name = '', classify = '') {
    return {
        name,
        classify,
        children: []
    }
}
function Item(name, children) {
    let item = {
        name
    }
    if (children) {
        item.children = children;
    }
    return item;
}

let s = 0;
const STAGE = {
    INIT: ++s,
    BEGIN: ++s,
    HEADER_NAME: ++s,
    HEADER_CONTENT: ++s,
    SECTION: ++s,
    WORD: ++s,
    LINE_END: ++s
}
function isEnd(c) {
    return c === '\r' || c === '\n';
}
function parse(txt) {
    if (!txt) {
        return;
    }
    let l = txt.length;
    let i = 0;
    let books = [];
    let book, name, content, children;
    let stage = STAGE.INIT;
    let lastStage;
    let c;
    while (i < l) {
        c = txt[i];

        switch (stage) {
            case STAGE.INIT:
                if (c === ' ' || c === '\r' || c === '\n') {
                    i++;
                    break;
                } else if (c === '#') {
                    stage = STAGE.BEGIN;
                    i++;
                    break;
                } else {
                    stage = STAGE.WORD;
                    name = '';
                    break;
                }
            case STAGE.BEGIN:
                if (c === '#') {
                    stage = STAGE.SECTION;
                    i++;
                    content = '';
                    name = '';
                    break;
                } else if (/\w/.test(c)) {
                    if (lastStage !== STAGE.HEADER_CONTENT) {
                        if (book) {
                            books.push(book);
                        }
                        book = Book('', '');
                    }
                    name = '';
                    content = '';
                    stage = STAGE.HEADER_NAME;
                    break;
                } else {
                    throw Error('header error')
                }
            case STAGE.HEADER_NAME:
                if (c === ':') {
                    stage = STAGE.HEADER_CONTENT;
                    i++;
                    break;
                } else {
                    name += c;
                    i++;
                    break;
                }
            case STAGE.HEADER_CONTENT:
                if (isEnd(c)) {
                    lastStage = stage;
                    stage = STAGE.LINE_END;
                    book[name.trim()] = content.trim();
                    i++;
                    break;
                } else {
                    content += c;
                    i++;
                    break;
                }
            case STAGE.SECTION:
                if (isEnd(c)) {
                    lastStage = stage;
                    stage = STAGE.LINE_END;
                    children = [];
                    book.children.push(Item(name.trim(), children));
                    i++;
                } else {
                    name += c;
                    i++;
                }
                break;
            case STAGE.WORD:
                if (c === ',') {
                    children.push(Item(name.trim()));
                    i++;
                    name = '';
                    break;
                } else if (isEnd(c)) {
                    lastStage = stage;
                    children.push(Item(name.trim()));
                    stage = STAGE.LINE_END;
                    i++;
                    break;
                } else {
                    name += c;
                    i++;
                    break;
                }
                break;
            case STAGE.LINE_END:
                if (!isEnd(c)) {
                    stage = STAGE.INIT;
                } else {
                    i++;
                }
                break;
        }
    }
    if (stage === STAGE.WORD && c !== ',') {
        children.push(Item(name.trim()));
    }
    books.push(book);
    return books;

}

module.exports = parse;