import {FlatList as List} from 'react-native';
import React from 'react';
import Empty from './Empty'

class FlatList extends List{
    static defaultProps = {
        ...List.defaultProps,
        bounces:false,
        showsVerticalScrollIndicator:false,
        showsHorizontalScrollIndicator:false,
        ListEmptyComponent:<Empty />
    }
}

export default FlatList;