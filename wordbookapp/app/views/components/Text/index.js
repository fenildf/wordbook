import React from 'react';

import {Text as RNText} from 'react-native';


const defaultStyle = {
    fontSize:14,
    fontWeight:'200'
}
class Text extends RNText{
    render(){
        return React.cloneElement(super.render(),{style:[defaultStyle,this.props.style]})
    }
}

export default Text;