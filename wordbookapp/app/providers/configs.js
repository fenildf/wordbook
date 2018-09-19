import MeaningProvier from './MeaningProvider'
import StorageProvider from './StorageProvider'
import WordsProvider from './WordsProvider'

export default [
    {
        name:'word',
        type: WordsProvider
    },
    {
        name:'meaning',
        type: MeaningProvier
    },
    {
        name:'dbversion',
        type:StorageProvider,
        defaultState:2
    },
    {
        name:'theme',
        type:StorageProvider,
    },
    {
        name:'wordPageTheme',
        type: StorageProvider,
        defaultState:'white'
    },
    {
        name:'myWordBook',
        type: StorageProvider,
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
        type: StorageProvider,
    }
]