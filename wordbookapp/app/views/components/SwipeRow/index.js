'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    PanResponder,
    Animated
} from 'react-native';
// import StyleSheet from 'react-native-theme-stylesheet';
import PropTypes from 'prop-types';

let CURRENT_SLIDE = undefined;
class SwpieView extends Component {
    static defaultProps={
        actionBarWidth: 156,
        scrollable:true
    }
    constructor(...props) {
        super(...props);
        this.state = {
            width: 0,
        }
        this.x = 0;
        this.animatedValue = new Animated.Value(0);

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
            onPanResponderTerminationRequest: this._onPanResponderTerminationRequest,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderEnd: this._onPanResponderEnd
        })
        this._touched = false;
        this.isUnfold = false;

        this.animatedValue.addListener(this._onScroll);

    }
    componentWillUnmount() {
        if(CURRENT_SLIDE == this){
            CURRENT_SLIDE = undefined;
        }
        this.animatedValue.removeListener(this._onScroll);
    }
    _onScroll=(e)=>{
        this.props.onScroll&&this.props.onScroll(e);
    }
    scrollTo(x, animated) {
        if (animated) {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: x,
                    duration: 100

                }
            ).start()
        } else {
            this.animatedValue.setValue(x);
        }
    }
    hideActionBar(animated) {
        this.x = 0;
        this.scrollTo(0, animated);
    }
    _onLayout = (e) => {
        let { width } = e.nativeEvent.layout;
        if (width !== this.state.width) {
            this.setState({
                width
            });
        }
    }
    _onMoveShouldSetPanResponder = (e, gestureState) => {
        if(!this.props.scrollable){
            return false;
        }
        if(CURRENT_SLIDE&&CURRENT_SLIDE!==this && CURRENT_SLIDE.isUnfold){
            CURRENT_SLIDE.isUnfold = false;
            CURRENT_SLIDE.hideActionBar();
        }
        if (this._touched) {
            return this._touched;
        }
        if (Math.abs(gestureState.dx) > 1) {
            this._touched = true;
        }
        return this._touched;
    }
    _onPanResponderTerminationRequest = (e) => {
        return false;
    }
    _onPanResponderMove = (e, gestureState) => {
        let x = this.x + gestureState.dx;
        let { actionBarWidth } = this.props;
        if (x > 0) {
            x = 0;
        } else if (x < -actionBarWidth) {
            x = -actionBarWidth;
        }
        this.scrollTo(x);
    }
    _onPanResponderEnd = (e, gestureState) => {
        this._touched = false;
        let { actionBarWidth } = this.props;

        if (-this.x - gestureState.dx < actionBarWidth / 2) {
            this.x = 0;
            this.scrollTo(0, true);
            this.isUnfold = false;
        } else {
            this.x = -actionBarWidth;
            this.scrollTo(this.x, true);
            this.isUnfold = true;
            CURRENT_SLIDE = this;
        }
    }
    _renderActionBar() {
        let {
            actionBarWidth,
        } = this.props;
        let actionBar = this.props.renderActionBar({
            actionBarWidth,
        });
        return actionBar;
    }
    render() {
        let {
            actionBarWidth
        } = this.props;
        let {
            width
        } = this.state;
        return (
            <View
                style={[styles.row, this.props.style]}
                onLayout={this._onLayout}>
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[styles.row, { transform: [{ translateX: this.animatedValue }] }]}>
                    <View
                        style={{ width: this.state.width }}>
                        {this.props.children}
                    </View>
                    <View
                        style={{ width: actionBarWidth }}>
                        {this.props.actionButtons}
                    </View>
                </Animated.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    }
});

export default SwpieView;