'use strict'
import React from 'react';
import { View } from 'react-native';
import Text from './../../components/Text';
import Item from './../../components/Item';
import StyleSheet from './../../../util/StyleSheet';
import actions from '../../../constants/actions';
import {dispatch} from 'febrest';
class Section extends React.Component {
    static defaultProps = {
        renderItem: function (item) {
            return (
                <Item
                    onPress={()=>dispatch(actions.APP_NAVIGATE,{routeName:'Book',params:{book:item}})}
                    style={styles.item}
                    key={item.name}>
                    <Text>{item.name}</Text>
                </Item>
            )
        }
    }
    constructor(...props) {
        super(...props);
    }
    _renderItem() {
        let data = this.props.data;
        if (!data) {
            return null;
        }
        return data.map((item) => {
            return this.props.renderItem(item)
        })
    }
    render() {
        return (
            <View
                style={styles.section}>
                <View
                    style={styles.titleWrapper}>
                    <Text
                        style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
                <View>
                    {this._renderItem()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(function (theme) {
    return {
        section: {
            marginHorizontal: 14
        },
        titleWrapper: {
            marginVertical: 14
        },
        title: {

        },
        item: {
            alignItems: 'center',
            borderBottomColor: theme.borderColor,
            borderBottomWidth: theme.px,
            paddingHorizontal:14
        }
    }
});
export default Section;