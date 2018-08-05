

'use strict'
import Screen from './../components/Screen';

const pages = [
    require('./PageList').default,
    require('./Main').default,
    require('./Book').default,
    require('./AddBook').default,
    require('./Section').default,
    require('./Word').default,
    require('./BookManager').default,
    require('./SearchBook').default,
    require('./AddWord').default
]

const routes = {

}

function flattenPages(pages) {
    pages.forEach(function(page){
        if (Array.isArray(page)) {
            flattenPages(page);
        } else {
            let routeConfig = page.routeConfig;
            routes[routeConfig.name] = { screen: Screen(page) };
        }
    })
}

flattenPages(pages);

export default routes;