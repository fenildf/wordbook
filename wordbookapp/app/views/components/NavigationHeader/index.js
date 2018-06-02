import React, { Component } from 'react';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { autoSize,px2dp } from 'react-native-improver';
import { View } from 'react-native';
import Text from './../Text';
import TouchableOpacity from './../TouchableOpacity';
const IOS = Platform.OS === 'ios';
import FontIcon from './../FontIcon';
class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        var styles = {
            left: {
                paddingLeft:20,
                justifyContent: 'flex-start',
            },
            right: {
                paddingRight:20,
                justifyContent: 'flex-end',
            },
            back: {
                paddingLeft:20,
                justifyContent: 'flex-start',
            }
        }
        return <TouchableOpacity
            onPress={this.props.onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                ...styles[type]
            }}>
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
            style={{
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft:20
            }}>
            {this.props.children}
        </View>
    }
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            title: this.props.title,
            canGoBack: false,
            header: this.props.header === null ? false : true,
            leftButton: this.props.leftButton,
            rightButton: this.props.rightButton,
            onLeftButtonPress:this.props.onLeftButtonPress,
            onRightButtonPress:this.props.onRightButtonPress,
            props: this.props
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let props = prevState.props;
        let nextState = {}
        if (nextProps.title !== props.title) {
            nextState.title = nextProps.title;
        }
        if (nextProps.leftButton !== props.leftButton) {
            nextState.leftButton = nextProps.leftButton;
        }
        if (nextProps.rightButton !== props.rightButton) {
            nextState.rightButton = nextProps.rightButton;
        }
        nextState.props = nextProps;
        return nextState;
    }
    _mergePropsToState(){

    }
    updateInfo(info) {
        this.setState(info);
    }
    _renderLeftButton() {
        var leftButton;
        var navigation = this.props.navigation;
        if (typeof this.state.leftButton === 'object') {
            return <Button
                type='left'
                onPress={this.state.onLeftButtonPress}
                children={this.state.leftButton} />;
        } else if ((navigation.state.index !== 0 || APPContext.isLoginPopupShow)) {
            return <Button
                type='back'
                onPress={navigation.state.index !== 0 ? () => navigation.goBack() : () => APPContext.hideLoginPopup()}
                children={this._backButton(navigation)} />;
        }
        return null;
    }
    _backButton(navigation) {
        return <FontIcon style={{marginRight:20}} name='ios-arrow-round-back-outline'/>
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return <Button
                type='right'
                onPress={this.state.onLeftButtonPress}
                children={this.state.rightButton} />;
        } else {
            return null;
        }
    }
    _renderTitle() {
        var child;
        if (typeof this.state.title === 'function') {
            child = this.state.title;
        } else {
            child = <Text style={[{ fontSize: 14 }, this.props.titleStyle]}>{this.state.title}</Text>
        }
        return <Title>{child}</Title>
    }
    render() {
        if (!this.state.header) {
            return null;
        }
        return <View
            style={[
                { backgroundColor: '#fff',borderBottomColor:'#f5f5f5',borderBottomWidth:px2dp(1) },
                this.props.style,
                {
                    height: IOS ? 64 : 44,
                    flexDirection: 'row',
                    paddingTop: IOS ? 20 : 0,
                }
            ]}>
            {this._renderLeftButton()}
            {this._renderTitle()}
            {this._renderRightButton()}
        </View>
    }
}
