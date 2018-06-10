'use strict'
import React, { Component } from 'react';

import {
    View,
} from 'react-native';
import SelectableItem from './SelectableItem';

function BookSection(books,onSelected) {
    return books.map(book => {
        return (
            <SelectableItem
                onSelected={(isSelected) => onSelected(isSelected, book)}
                key={book.name}
                name={book.name}
                count={book.count} />
        );
    })
}

export default BookSection;