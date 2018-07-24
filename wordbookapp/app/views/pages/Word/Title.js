'use strict'
import React,{ Component } from "react";
import Text from './../../components/Text';

import {
    View
} from 'react-native';



class Title extends Component{
    constructor(...props){
        super(...props);
        this.state = {
            title:this.props.defaultTitle
        }
    }
    setTitle(title){
        this.setState({title})
    }
    render(){
        return (
            <View style={this.props.style}>
                <Text style={this.props.titleStyle}>
                {this.state.title}
                </Text>
            </View>
        );
    }
}

export default Title;