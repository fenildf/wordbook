import {FlatList as List} from 'react-native';

class FlatList extends List{
    static defaultProps = {
        ...List.defaultProps,
        bounces:false,
        showsVerticalScrollIndicator:false,
        showsHorizontalScrollIndicator:false
    }
}

export default FlatList;