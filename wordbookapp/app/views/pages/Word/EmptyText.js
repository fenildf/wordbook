'use strict'
import React from 'react';
import Text from './../../components/Text';


function EmptyText({text,style}){
    return (
        <Text
            style={style}>
            {text}
        </Text>
    );
}

export default EmptyText;