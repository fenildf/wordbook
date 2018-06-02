'use strict'
import FontIcon from './../../components/FontIcon';

import Text from './../../components/Text';
import TouchableOpacity from './../../components/TouchableOpacity';

import React from 'react';
import StyleSheet from './../../../util/StyleSheet';
class SelectableItem extends React.Component{
    constructor(...props){
        super(...props);
        let {selected} = this.props;
        this.state = {
            selected,
            propsSelected:selected
        }
    }
    static getDerivedStateFromProps(nextProps,preState){
        if(preState.propsSelected!==nextProps.selected){
            return {
                selected:nextProps.selected,
                propsSelected:nextProps.selected
            }
        }
        return null;
    }
    _selected=()=>{
        let {selected} = this.state;
        this.setState({selected:!selected});
        this.props.onSelected && this.props.onSelected(!selected);
    }
    render(){
        let {selected} = this.state;
        let name = selected?'ios-radio-button-on':'ios-radio-button-off';
        return (
            <TouchableOpacity
                style={styles.row}
                onPress={this._selected}>
                <FontIcon 
                    color='##D12A00'
                    name={name}/>
                <Text style={styles.name}>{this.props.name} ({this.props.count})</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create(function(theme){
    return {
        row:{
            flexDirection:'row',
            height:theme.itemHeightM,
            alignItems:'center'
        },
        name:{
            marginLeft:8
        }
    }
});

export default SelectableItem;