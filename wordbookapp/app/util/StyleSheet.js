import {StyleSheet as SH} from 'react-native';

import {Theme} from 'react-native-improver';

let  StyleSheet = Object.create(SH);

StyleSheet.create = function(func){
    let theme = Theme.getTheme();
    return func(theme);
}

export default StyleSheet;