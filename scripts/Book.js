function Book(name='',classify=''){
    return {
        name,
        classify,
        children:[]
    }
 }
 function Item(name,children){
    let item = {
        name
    }
    if(children){
        item.children = children;
    }
    return item;
}

module.exports = {
    Book,
    Item
}