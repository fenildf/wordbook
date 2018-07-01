import React, { Component } from 'react';
import { View } from 'react-native';
import TouchableOpacity from './../TouchableOpacity';
import StyleSheet from './../../../util/StyleSheet';
class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        return <TouchableOpacity
            onPress={this.props.onPress}
            style={[styles.button,styles[type]]}>
            {this.props.children}
        </TouchableOpacity>
    }
}
class Title extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        return <View
            style={styles.title}>
            {this.props.children}
        </View>
    }
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
    }
   
    _renderLeftButton() {
        if (typeof this.state.leftButton === 'object') {
            return <Button
                type='leftButton'
                onPress={()=>this.props.onLeftButtonPress&&this.props.onLeftButtonPress()}
                children={this.props.leftButton} />;
        }
        return <View style={styles.emptyLeftButton}/>
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return <Button
                type='rightButton'
                onPress={()=>this.props.onRightButtonPress&&this.props.onRightButtonPress()}
                children={this.props.rightButton} />;
        } else {
            return null;
        }
    }
    _renderTitle() {
        var child;
        return <Title>{child}</Title>
    }
    render() {
        if (!this.state.header) {
            return null;
        }
        return <View
            style={[
                styles.header,
            ]}>
            {this._renderLeftButton()}
            {this._renderTitle()}
            {this._renderRightButton()}
        </View>
    }
}


const styles = StyleSheet.create(function(theme){
    return {
        header:{
            backgroundColor: theme.navigationHeaderBackgroundColor,
            flexDirection: 'row',
            height:theme.navigationHeaderHeight,
            paddingTop:theme.navigationHeaderPaddingTop
        },
        title:{
            flex:1,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
        },
        button:{
            flexDirection: 'row',
            alignItems: 'center',
        },
        emptyLeftButton:{
            marginRight:theme.navigationHeaderLeftButtonMargin,
        },
        leftButton:{
            paddingLeft:theme.navigationHeaderLeftButtonMargin,
            justifyContent: 'flex-start',
            marginRight:theme.navigationHeaderLeftButtonMargin,
        },
        rightButton:{
            paddingRight:theme.navigationHeaderLeftButtonMargin,
            justifyContent: 'flex-end',
            marginLeft:theme.navigationHeaderLeftButtonMargin,
        }
    }
});