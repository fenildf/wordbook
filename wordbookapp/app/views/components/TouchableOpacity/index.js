import {TouchableOpacity as Touch} from 'react-native';


class TouchableOpacity extends Touch{
    static defaultProps = {
        ...Touch.defaultProps,
        activeOpacity:1
    }
}

export default TouchableOpacity;