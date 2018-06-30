
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,PixelRatio,Platform } from 'react-native';

const IOS = Platform.OS === 'ios';

var BaseTheme = {
    f1: 10,
    f2: 12,
    f3: 14,
    f4: 16,
    f5: 18,
    f6: 20,
    color:'#333',
    tipColor:'#888',
    px:px2dp(1),
    borderColor:'#c5c5c5',
    itemHeightM:48,
    itemHeightL:36,
    itemHeightH:60,
    paddingHorizontal:16,
    navigationHeaderHeight: IOS ? 64 : 44,
    navigationHeaderPaddingTop:IOS ? 20 : 0,
    navigationHeaderBackgroundColor:'#fff',
    navigationHeaderColor:'#333',
    navigationHeaderFontSize:14,
    navigationHeaderLeftButtonMargin:20,
    navigationHeaderRightButtonMargin:20,
}

export default BaseTheme;