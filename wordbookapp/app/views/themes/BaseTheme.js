
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,PixelRatio } from 'react-native';
var BaseTheme = {
    f1: 10,
    f2: 12,
    f3: 14,
    f4: 16,
    f5: 18,
    f6: 20,
    px:1/PixelRatio.get(),
    borderColor:'#c5c5c5',
    itemHeightM:48,
    itemHeightL:36,
    itemHeightH:60,
    paddingHorizontal:16,
    navigationHeaderBackgroundColor:'#fff',
    navigationHeaderColor:'#333',
    navigationHeaderFontSize:14
}

export default BaseTheme;