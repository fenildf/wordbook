import React from 'react';
import {
    ScrollView as Scroll
} from 'react-native';


class ScrollView extends Scroll{
    static defaultProps = {
        bounces:false,
        showsVerticalScrollIndicator:false,
        showsHorizontalScrollIndicator:false
    }
}

export default ScrollView