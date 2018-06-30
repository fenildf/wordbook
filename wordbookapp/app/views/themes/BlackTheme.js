
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,PixelRatio,Platform } from 'react-native';

const IOS = Platform.OS === 'ios';

var BlackTheme = {
    color:'#737373',
    tipColor:'#888',
    px:px2dp(1),
    borderColor:'#fff',
    navigationHeaderBackgroundColor:'#000',
    backgroundColor:'#000',
    navigationHeaderColor:'#fff',
}

export default BlackTheme;