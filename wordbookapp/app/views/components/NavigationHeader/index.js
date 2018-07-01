import React, { Component } from 'react';
import { View } from 'react-native';
import Text from './../Text';
import TouchableOpacity from './../TouchableOpacity';
import FontIcon from './../FontIcon';
import StyleSheet from './../../../util/StyleSheet';
import {dispatch} from 'febrest';
import actions from './../../../constants/actions'
import Header from './../Header'
class NavigationHeader extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            title: this.props.title,
            canGoBack: false,
            header: this.props.header === null ? false : true,
            leftButton: this.props.leftButton,
            rightButton: this.props.rightButton,
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
    update(info) {
        this.setState(info);
    }
    _renderLeftButton() {
        let {routeState} = this.props;
        if (typeof this.state.leftButton === 'object') {
            return this.state.leftButton
        } else if (routeState.index !== 0) {
            return this._backButton();
        }
    }
    _backButton() {
        return <TouchableOpacity 
                    onPress={()=>dispatch(actions.APP_NAVIGATE_GOBACK)}
                    children={<FontIcon style={styles.backArrow} name='ios-arrow-round-back-outline'/>}/> 
            
    }
    _renderRightButton() {
        if (typeof this.state.rightButton === 'object') {
            return this.state.rightButton
        }
    }
    _renderTitle() {
        var child;
        if (typeof this.state.title === 'object') {
            child = this.state.title;
        } else {
            child = <Text style={[styles.titleText,this.state.titleStyle]}>{this.state.title}</Text>
        }
        return <View>{child}</View>
    }
    render() {
        if (!this.state.header) {
            return null;
        }
        return <Header 
                    title={this._renderTitle()}
                    style={this.state.style}
                    rightButton={this._renderRightButton()}
                    leftButton={this._renderLeftButton()}/>
    }
}


const styles = StyleSheet.create(function(theme){
    return {
        titleText:{ 
            fontSize: theme.navigationHeaderFontSize,
            color:theme.navigationHeaderColor
        },
        backArrow:{
            color:theme.navigationHeaderColor
        },
    }
});

export default NavigationHeader;
