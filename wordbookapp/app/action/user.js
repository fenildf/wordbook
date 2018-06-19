import actions from './../constants/actions';

import user from './../controller/user';

export default [
    {
        key:actions.USER_ADD_BOOKS,
        controller:user.addBook
    },
    {
        key:actions.USER_GET_BOOKS,
        controller:user.getBooks
    },
    {
        key:actions.USER_MARK_WORD,
        controller:user.markWord
    },
    {
        key:actions.USER_GET_CUSTOMIZED_BOOKS,
        controller:user.getCustomizedBooks
    },
    {
        key:actions.USER_REMOVE_BOOKS,
        controller:user.removeBooks
    }
]