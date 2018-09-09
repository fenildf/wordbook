'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    PanResponder,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import Text from './../Text';
import StyleSheet from 'react-native-theme-stylesheet'
class SwipeView extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            // height: 60 * rem,
            width: 0,
            btnWidth: 74
        }
        this.x = 0;
        this.animatedValue = new Animated.Value(0);
        this._panResponder;
        this._scrollView;
        this._touched = false;
        this._index = i++;
        this.isUnfold = false;
    }
    componentWillUnmount() {
        delete S[this._index + ''];
    }

    componentWillMount() {
        S[this._index + ''] = this;
        var self = this;
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: function (e, gestureState) {
                for (var s in S) {
                    if (S[s].isUnfold && S[s] != self) {
                        S[s].isUnfold = false;
                        S[s].hideButton();
                    }
                }
                if (self._touched) {
                    return self._touched;
                }
                if (Math.abs(gestureState.dx)>1) {
                    self._touched = true;
                }
                return self._touched;
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderMove: function (e, gestureState) {
                var x = self.x + gestureState.dx;
                if (x > 0) {
                    x = 0;
                } else if (x < -self.state.btnWidth) {
                    x = -(self.state.btnWidth);
                }
                self.scrollTo(x);
            },
            onPanResponderEnd: function (e, gestureState) {
                self._touched = false;
                if (-self.x - gestureState.dx < (self.state.btnWidth / 2)) {
                    self.x = 0;
                    self.scrollTo(0, true);
                    self.isUnfold = false;
                } else {
                    self.x = -self.state.btnWidth;
                    self.scrollTo(-self.state.btnWidth, true);
                    self.isUnfold = true;
                }
            },
            onPanResponderRelease: function () {

            }
        })
    }

    _onScroll() {

    }
    _onItemDelete() {
        this.props.onItemDelete && this.props.onItemDelete();
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
    hideButton(animated) {
        this.x = 0;
        this.scrollTo(0, animated);
    }
    render() {
        var style = {
            height: this.state.height,
            width: this.state.width,
            flexDirection: 'row'
        }
        var btnStyle = {
            height: this.state.height,
            width: this.state.btnWidth,
            backgroundColor: '#FB4100',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
        return (
            <View
                style = {[style, this.props.style]}
                onLayout = {(e) => {
                    var {height, width} = e.nativeEvent.layout;
                    if (height != this.state.height || width !== this.state.width) {
                        this.setState({
                            height: height,
                            width: width
                        });
                    }
                } }>
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style = {{ flexDirection: 'row', transform: [{ translateX: this.animatedValue }] }}>
                    <View
                        style = {{ height: this.state.height, width: this.state.width }}>
                        {this.props.children}
                    </View>
                    <TouchableOpacity
                        style = {btnStyle}
                        onPress = {() => this._onItemDelete() }>
                        <Text style = {{ fontSize: 16, color: '#fff' }}>删除</Text>
                    </TouchableOpacity>
                </Animated.View>

            </View>
        );
    }
}
SlideToDelete.propTypes = {
    onItemDelete: PropTypes.func
}
SlideToDelete.defaultProps = {

}
const styles = StyleSheet.create({

});

export default SlideToDelete;