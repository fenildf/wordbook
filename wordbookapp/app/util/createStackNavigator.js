'use strict'
import React,{Component} from 'react';
import { 
    createNavigationContainer,
    StackView,
    createNavigator,
    StackRouter
 } from 'react-navigation';


function createRouter(routeConfigMap, stackRouterConfig){
    const router = StackRouter(routeConfigMap, stackRouterConfig);
    let getStateForAction = router.getStateForAction;
    router.getStateForAction = function(action, state){
        let s = getStateForAction(action, state);
        let currentIndex = s;
        s.routes.forEach((route,index)=>route.index = index);
        return s;
    }
    return router;
}
function createMyNavigator(routeConfigMap,stackRouterConfig){
    let router = createRouter(routeConfigMap, stackRouterConfig);
    let Navigator = createNavigator( StackView,router, stackRouterConfig);

    return Navigator;
}

function createStackNavigator(routeConfigMap, stackRouterConfig){
    
    let Navigator = createMyNavigator(routeConfigMap, stackRouterConfig);

    return createNavigationContainer(Navigator);
}

export default createStackNavigator;