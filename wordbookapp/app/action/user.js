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
    }
]