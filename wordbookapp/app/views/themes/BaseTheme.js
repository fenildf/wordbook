
import { autoSize, px2dp } from 'react-native-improver';
import { Dimensions,PixelRatio } from 'react-native';
var BaseTheme = {
    f1: autoSize(10),
    f2: autoSize(12),
    f3: autoSize(14),
    f4: autoSize(16),
    f5: autoSize(18),
    f6: autoSize(20),
    px:1/PixelRatio.get(),
    borderColor:'#f5f5f5',
    paddingHorizontal:autoSize(14),
}

export default BaseTheme;