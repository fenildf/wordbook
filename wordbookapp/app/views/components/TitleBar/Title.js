'use strict'
import React,{Component} from 'react';

import {View} from 'react-native';
import Text from './../Text';
import TouchableOpacity from './../TouchableOpacity';
import StyleSheet from './../../../util/StyleSheet';
class Title extends Component{
    constructor(...props){
        super(...props);
        this.state = {
            selected:false
        }
    }
    setSelected(){
        this.setState({selected:true});
    }
    cancelSelected(){
        this.setState({selected:false});
    }
    render(){
        let {
            onClick,
            item
        } = this.props;
        let {
            selected
        } = this.state;
        return (
            <TouchableOpacity
                onPress={()=>onClick(item)}
                style={styles.wrapper}>
                <Text
                    style={[styles.text,selected&&styles.selected]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }
}

const HEIGHT = 36;
const WIDTH = 96;
let TITLE;
function setSelected(title){
    if(TITLE){
        TITLE.cancelSelected(); 
    }
    title.setSelected();
    TITLE = title;
}

Title.setSelected = setSelected;
Title.HEIGHT = HEIGHT;
Title.WIDTH = WIDTH;


const styles = StyleSheet.create(theme=>{
    return {
        wrapper:{
            height:HEIGHT,
            width:WIDTH,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff'
        },
        text:{
            fontSize:theme.f3,
        },
        selected:{
            color:'#8fb7d1'
        }
    }
})
export default Title;