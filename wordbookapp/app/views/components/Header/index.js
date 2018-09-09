import React, { Component } from 'react';
import { View } from 'react-native';
import TouchableOpacity from './../TouchableOpacity';
import StyleSheet from 'react-native-theme-stylesheet';
class Button extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        var type = this.props.type;
        let child = this.props.child;
        if(child){
            return React.cloneElement(child,{style:[child.props.style,styles[type]]})
        }else{
            return null;
        }
    }
}
class Title extends Component {
    constructor(...props) {
        super(...props);
    }
    render() {
        let child = this.props.child;
        if(child){
            return React.cloneElement(child,{style:[child.props.style,styles.title]})
        }
    }
}
export default class Header extends Component {
    constructor(...props) {
        super(...props);
    }
   
    _renderLeftButton() {
        if (typeof this.props.leftButton === 'object') {
            return <Button
                    type='leftButton'
                    child={this.props.leftButton} />;
        }
        return <View style={styles.emptyLeftButton}/>
    }
    _renderRightButton() {
        if (typeof this.props.rightButton === 'object') {
            return <Button
                    type='rightButton'
                    child={this.props.rightButton} />;
        } else {
            return null;
        }
    }
    _renderTitle() {
        return <Title child={this.props.title}/>
    }
    render() {
        return <View
            style={[
                styles.header,
                this.props.style
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
        emptyLeftButton:{
            marginRight:theme.navigationHeaderLeftButtonMargin,
        },
        leftButton:{
            flexDirection: 'row',
            paddingLeft:theme.navigationHeaderLeftButtonMargin,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight:theme.navigationHeaderLeftButtonMargin,
        },
        rightButton:{
            flexDirection: 'row',
            paddingRight:theme.navigationHeaderLeftButtonMargin,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft:theme.navigationHeaderLeftButtonMargin,
        }
    }
});