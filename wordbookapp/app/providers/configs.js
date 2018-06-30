export default [
    {
        name:'word',
        type:'word'
    },
    {
        name:'meaning',
        type:'meaning'
    },
    {
        name:'dbversion',
        storage:true,
        defaultState:1
    },
    {
        name:'theme',
        type:'storage',
    },
    {
        name:'myWordBook',
        type:'storage',
        defaultState:{
            '我的生词本':{
                name:'我的生词本',
                count:0,
                type:'book2'
            },
            '我的单词本':{
                name:'我的单词本',
                count:0,
                type:'book1'
            },
        }
    },                     
    {
        name:'myStudyWord',
        type:'storage',
    }
]