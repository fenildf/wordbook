
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,PixelRatio,Platform } from 'react-native';

const IOS = Platform.OS === 'ios';

var BlackTheme = {
    color:'#fff',
    tipColor:'#fff',
    px:px2dp(1),
    borderColor:'#fff',
    navigationHeaderBackgroundColor:'#333',
    navigationHeaderColor:'#fff',
}

export default BlackTheme;