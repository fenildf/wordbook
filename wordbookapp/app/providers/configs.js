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
        name:'myWordBook',
        type:'storage'
    },                     
    {
        name:'myStudyWord',
        type:'storage'
    },
    {
        name:'myStudyBook',
        type:'storage',
        defaultState:{
            name:'单词本',
            count:0,
            type:'book1'
        }
    },
    {
        name:'myNewBook',
        type:'storage',
        defaultState:{
            name:'生词本',
            count:0,
            type:'book2'
        }
    }
]