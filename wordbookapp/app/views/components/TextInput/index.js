import React from 'react';

import {TextInput as RNTextInput} from 'react-native';


const defaultStyle = {
    fontSize:14,
    fontWeight:'200',
    color:'#333',
    padding:0
}
class Text extends RNTextInput{
    static defaultProps={
        ...RNTextInput.defaultProps,
        underlineColorAndroid:'transparent'
    }
    render(){
        return React.cloneElement(super.render(),{style:[defaultStyle,this.props.style]})
    }
}

export default Text;