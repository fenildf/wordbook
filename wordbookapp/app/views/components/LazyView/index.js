import React,{Component} from 'react';

class LazyView extends Component{
    constructor(...props){
        super(...props);
        this.state = {
            load:this.props.load
        }
    }
    load(){
        if(!this.state.load){
            this.setState({load:true})
        }
    }
    render(){
        if(this.state.load){
            return this.props.child;
        }else{
            return null;
        }
    }
}

export default LazyView;