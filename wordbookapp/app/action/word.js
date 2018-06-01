import actions from './../constants/actions';

import word from './../controller/word';

export default [
    {
        key:actions.WORD_GET_BOOKS,
        controller:word.getBooks
    }
]