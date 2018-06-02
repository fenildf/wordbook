import React, { Component } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native'

import StyleSheet from './../../../util/StyleSheet'
import Item from './../Item';
import Text from './../Text';
class FoldableItem extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            fold: this.props.defaultUnfold
        }
    }
    toggle=()=>{
        this.setState({fold:!this.state.fold});
    }
    render() {
        let { fold } = this.state;
        return (
            <View
                style={[styles.view,this.props.style]}>
                <Item
                    style={[styles.item,this.props.itemStyle]}
                    onPress={this.toggle}>
                    <Text
                        style={[styles.title,this.props.titleStyle]}>
                        {this.props.title}
                    </Text>
                </Item>
                {!fold?this.props.children:null}
            </View>
        )
        ;
    }
}


const styles = StyleSheet.create(function (theme) {
    return {
        view: {
            backgroundColor: '#fff',
        },
        item:{
            paddingHorizontal:0
        },
        title:{
            
        }
    }
});

export default FoldableItem;