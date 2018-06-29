import React, { Component } from 'react';
import { View } from 'react-native';
import Text from './../Text';
import TouchableOpacity from './../TouchableOpacity';
import FontIcon from './../FontIcon';
import StyleSheet from './../../../util/StyleSheet';
import {dispatch} from 'febrest';
import actions from './../../../constants/actions'
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
        let {routeState} = this.props;
        if (typeof this.state.leftButton === 'object') {
            return <Button
                type='leftButton'
                onPress={()=>this.state.onLeftButtonPress&&this.state.onLeftButtonPress()}
                children={this.state.leftButton} />;
        } else if (routeState.index !== 0) {
            return <Button
                type='leftButton'
                onPress={()=>dispatch(actions.APP_NAVIGATE_GOBACK)}
                children={this._backButton()} />;
        }
        return <View style={styles.emptyLeftButton}/>
    }
    _backButton() {
        return <FontIcon style={styles.backArrow} name='ios-arrow-round-back-outline'/>
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return <Button
                type='rightButton'
                onPress={()=>this.state.onRightButtonPress&&this.state.onRightButtonPress()}
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
            child = <Text style={[styles.titleText, this.props.titleStyle]}>{this.state.title}</Text>
        }
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
        titleText:{ 
            fontSize: theme.navigationHeaderFontSize,
            color:theme.navigationHeaderColor
        },
        backArrow:{
            color:theme.navigationHeaderColor
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