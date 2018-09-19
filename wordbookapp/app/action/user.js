import actions from './../constants/actions';

import user from './../controller/user';

export default [
    {
        name: actions.USER_ADD_BOOKS,
        controller: user.addBook
    },
    {
        name: actions.USER_GET_BOOKS,
        controller: user.getBooks
    },
    {
        name: actions.USER_MARK_WORD,
        controller: user.markWord
    },
    {
        name: actions.USER_GET_CUSTOMIZED_BOOKS,
        controller: user.getCustomizedBooks
    },
    {
        name: actions.USER_REMOVE_BOOKS,
        controller: user.removeBooks
    },
    {
        name: actions.USER_REMOVE_WORD,
        controller: user.removeWord
    },
    {
        name: actions.USER_EDIT_WORD,
        controller: user.editWord
    }
]