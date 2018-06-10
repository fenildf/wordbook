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
            fold: !!this.props.fold,
            propsFold:this.props.fold
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.fold!==state.propsFold){
            return {
                fold:props.fold,
                propsFold:props.fold
            }
        }else{
            return null;
        }
    }
    toggle = () => {
        let fold = this.state.fold;
        if (this.props.onStateChange) {
            this.props.onStateChange(!fold);
        } else {
            this.setState({ fold: !fold});
        }
    }
    fold() {
        if (this.state.fold) {
            return;
        }
        this.toggle();
    }
    unfold() {
        if (!this.state.fold) {
            return;
        }
        this.toggle();
    }
    render() {
        let { fold } = this.state;
        return (
            <View
                style={[styles.view, this.props.style]}>
                <Item
                    style={[styles.item, this.props.itemStyle]}
                    onPress={this.toggle}>
                    <Text
                        style={[styles.title, this.props.titleStyle]}>
                        {this.props.title}
                    </Text>
                </Item>
                {!fold ? this.props.children : null}
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
        item: {
            paddingHorizontal: 0
        },
        title: {

        }
    }
});

export default FoldableItem;