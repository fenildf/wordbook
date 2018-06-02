import Icon from 'react-native-vector-icons/Ionicons';

import React, {
    Component
} from 'react';

const SIZE = {
    m: 20,
    l: 12,
    h: 28
}
class FontIcon extends Component {
    static defaultProps = {
        size: 'm',
        color: '#333'
    }
    constructor(...props) {
        super(...props);
    }
    render() {
        let {
            name,
            size,
            color,
            style
        } = this.props;

        size = typeof size === 'number' ? size : (SIZE[size] ? SIZE[size] : 0);
        return (
            <Icon
                name={name}
                size={size}
                style={style}
                color={color} />
        )
    }
}
export default FontIcon;
