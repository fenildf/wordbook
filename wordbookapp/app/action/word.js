import actions from './../constants/actions';

import word from './../controller/word';

export default [
    {
        name:actions.WORD_GET_CLASSIFY,
        controller:word.getClassify
    },
    {
        name:actions.WORD_GET_BOOKS,
        controller:word.getBooks
    },
    {
        name:actions.WORD_GET_SECTIONS,
        controller:word.getSections
    },
    {
        name:actions.WORD_GET_WORDS,
        controller:word.getWords
    },
    {
        name:actions.WORD_GET_MEANING,
        controller:word.getMeaning
    },
    {
        name:actions.SEARCH_BOOK,
        controller:word.searchBook
    }
]