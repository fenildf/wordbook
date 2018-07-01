'use strict'
import React,{Component} from 'react';

class C extends Component {
    constructor(...props){
        super(...props);
        this.state = {

        }
    }
    componentWillUnmount() {
        this.state.child = null;
    }
    
    
    setChild(child){
        return new Promise((resolve)=>{
            this.setState({child},function(){
                resolve();
            });
        });
    }
    render(){
        return this.state.child||null;
    }
}

export default C;