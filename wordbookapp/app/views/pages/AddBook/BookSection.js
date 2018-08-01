'use strict'
import React, { Component } from 'react';

import {
    View,
} from 'react-native';
import Item from './Item';

function BookSection(books,onSelected,selectdBooks) {
    return books.map(book => {
        return (
            <Item
                onSelected={(isSelected) => onSelected(isSelected, book)}
                key={book.name}
                selected={!!selectdBooks[book.name]}
                name={book.name}
                count={book.count} />
        );
    })
}

export default BookSection;