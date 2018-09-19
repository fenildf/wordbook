
import user from './user';

function getClassify(word) {
    return getBooks(word).then(state => {
        let books = state.books;
        let classify = {};
        books.forEach(book => {
            let items = classify[book.classify] || {
                children: [],
                name: book.classify
            };
            items.children.push(book);
            classify[book.classify] = items;
        });
        return { classify: Object.values(classify) };

    });
}
function getBooks(word) {
    return word('books', { unselect: true }).then((books) => {
        return {
            books
        };
    });
}
function getSections(word, $payload) {
    let payload = $payload;
    return word('sections', payload).then((sections) => {
        return { sections };
    });

}

function getWords(word, $payload) {
    let payload = $payload;
    return word('words', payload).then((words) => {
        return { words };
    });
}

function getMeaning(meaning, $payload) {
    let payload = $payload;
    return meaning(payload).then(response => {
        return { meaning: response };
    })
}

function searchBook(word, $payload) {
    return word('search', $payload.searchText).then((result) => {
        return { result }
    });
}

/**单词页面初始化数据 */
function wordBook(word) {
    return word('user').then((items) => {
        return { data: { items } }
    });
}
export default {
    getBooks,
    getSections,
    getWords,
    getMeaning,
    getClassify,
    searchBook,
    wordBook
}