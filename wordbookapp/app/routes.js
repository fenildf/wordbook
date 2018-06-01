'use strict'
import pages from './views/pages';
import Screen from './views/components/Screen';


var routes = {};

function isMap(o) {
    return typeof o === 'object' && o.constructor === Object;
}
function flattenPages(pages) {
    var page;
    for (var o in pages) {
        page = pages[o];
        if (isMap(page)) {
            flattenPages(page);
        } else {
            routes[o] = { screen: Screen(page) };
        }
    }
}

flattenPages(pages);

export default routes;