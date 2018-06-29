import actions from './../constants/actions';

import word from './../controller/word';

export default [
    {
        key:actions.WORD_GET_CLASSIFY,
        controller:word.getClassify
    },
    {
        key:actions.WORD_GET_BOOKS,
        controller:word.getBooks
    },
    {
        key:actions.WORD_GET_SECTIONS,
        controller:word.getSections
    },
    {
        key:actions.WORD_GET_WORDS,
        controller:word.getWords
    },
    {
        key:actions.WORD_GET_MEANING,
        controller:word.getMeaning
    },
    {
        key:actions.SEARCH_BOOK,
        controller:word.searchBook
    }
]