// const u = [];
// const s = document.querySelectorAll('ul#mainwordlist>li');
// function sr(p){
//     let name = p.querySelector('h3').innerHTML;
//     let hasChild = p.getAttribute('has_child')=='1';
//     if(hasChild){
//         [].slice.call(p.querySelectorAll('ol>li')).forEach(function(item){
//             let innerName = item.querySelector('h4').innerHTML;
//             let link = '?action=courses&classid='+item.getAttribute('class_id');
//             u.push({
//                 name:name+'-'+innerName,
//                 link
//             })
//         })
//     }else{
//         u.push({
//             name,
//             link:'?action=courses&classid='+p.getAttribute('class_id')
//         })
//     }
// }
// [].slice.call(s).forEach(sr);

const u = [{
    "classify":"大学英语",
    "name": "大学英语四级必备词汇",
    "link": "?action=courses&classid=11"
}, {
    "classify":"大学英语",
    "name": "大学英语四级救命词汇",
    "link": "?action=courses&classid=122"
}, {
    "classify":"成人考试",
    "name": "成人学位英语",
    "link": "?action=courses&classid=703"
}, {
    "classify":"成人考试",
    "name": "成人大学外语学习指南吉林版",
    "link": "?action=courses&classid=704"
}, {
    "classify":"成人考试",
    "name": "成人学位英语三级",
    "link": "?action=courses&classid=705"
}, {
    "classify":"成人考试",
    "name": "成人自考英语二重点",
    "link": "?action=courses&classid=706"
}, {
    "classify":"成人考试",
    "name": "英语专业自考本专科(上)  ",
    "link": "?action=courses&classid=707"
}, {
    "classify":"成人考试",
    "name": "英语专业自考本专科(下)",
    "link": "?action=courses&classid=708"
}, {
    "classify":"成人考试",
    "name": "成人考试大学英语自学教程(上册)",
    "link": "?action=courses&classid=709"
}, {
    "classify":"成人考试",
    "name": "成人考试大学英语自学教程(下册) ",
    "link": "?action=courses&classid=710"
}, {
    "classify":"成人考试",
    "name": "成人考试专科起点升本科考试大纲",
    "link": "?action=courses&classid=711"
}, {
    "classify":"成人考试",
    "name": "BEC商务英语BEC高级",
    "link": "?action=courses&classid=681"
}, {
    "classify":"成人考试",
    "name": "BEC商务英语BEC中级",
    "link": "?action=courses&classid=680"
}, {
    "classify":"成人考试",
    "name": "托业考试必备",
    "link": "?action=courses&classid=682"
}, {
    "classify":"成人考试",
    "name": "英语翻译考试二级翻译口笔译大纲",
    "link": "?action=courses&classid=715"
}, {
    "classify":"成人考试",
    "name": "英语翻译考试三级笔译（上）",
    "link": "?action=courses&classid=716"
}, {
    "classify":"成人考试",
    "name": "英语翻译考试三级笔译（下）",
    "link": "?action=courses&classid=717"
}, {
    "classify":"大学英语",
    "name": "大学英语六级必备词汇",
    "link": "?action=courses&classid=12"
}, {
    "classify":"大学英语",
    "name": "大学英语六级救命词汇",
    "link": "?action=courses&classid=123"
}, {
    "classify":"大学英语",
    "name": "考研必备词汇",
    "link": "?action=courses&classid=13"
}, {
    "classify":"大学英语",
    "name": "2013考研大纲新增词汇",
    "link": "?action=courses&classid=143"
}, {
    "classify":"出国留学",
    "name": "TOEFL必备词汇",
    "link": "?action=courses&classid=14"
}, {
    "classify":"出国留学",
    "name": "雅思必备词汇",
    "link": "?action=courses&classid=15"
}, {
    "classify":"出国留学",
    "name": "GRE考试必备词汇",
    "link": "?action=courses&classid=16"
}, {
    "classify":"出国留学",
    "name": "GMAT600分词汇",
    "link": "?action=courses&classid=36"
}, {
    "classify":"出国留学",
    "name": "GMAT800分常考",
    "link": "?action=courses&classid=37"
}, {
    "classify":"出国留学",
    "name": "GMAT词汇精选",
    "link": "?action=courses&classid=38"
}, {
    "classify":"成人考试",
    "name": "MBA联考词汇",
    "link": "?action=courses&classid=39"
}, {
    "classify":"大学英语",
    "name": "研究生入学考试",
    "link": "?action=courses&classid=40"
}, {
    "classify":"大学英语",
    "name": "专四必备词汇",
    "link": "?action=courses&classid=90"
}, {
    "classify":"大学英语",
    "name": "专八必备词汇",
    "link": "?action=courses&classid=91"
}, {
    "classify":"出国留学",
    "name": "SAT数学相关词汇 ",
    "link": "?action=courses&classid=121"
}, {
    "classify":"高中英语",
    "name": "高考冲刺词汇",
    "link": "?action=courses&classid=139"
}, {
    "classify":"高中英语",
    "name": "高考大纲词汇",
    "link": "?action=courses&classid=140"
}, {
    "classify":"高中英语",
    "name": "高考常用短语",
    "link": "?action=courses&classid=141"
}, {
    "classify":"高中英语",
    "name": "B级考试附加词汇",
    "link": "?action=courses&classid=135"
}, {
    "classify":"小学英语",
    "name": "小学牛津版一年级上学期",
    "link": "?action=courses&classid=63"
}, {
    "classify":"小学英语",
    "name": "小学牛津版一年级下学期",
    "link": "?action=courses&classid=64"
}, {
    "classify":"小学英语",
    "name": "小学牛津版二年级上学期",
    "link": "?action=courses&classid=65"
}, {
    "classify":"小学英语",
    "name": "小学牛津版二年级下学期",
    "link": "?action=courses&classid=66"
}, {
    "classify":"小学英语",
    "name": "小学牛津版三年级上学期",
    "link": "?action=courses&classid=67"
}, {
    "classify":"小学英语",
    "name": "小学牛津版三年级下学期",
    "link": "?action=courses&classid=68"
}, {
    "classify":"小学英语",
    "name": "小学牛津版四年级上学期",
    "link": "?action=courses&classid=69"
}, {
    "classify":"小学英语",
    "name": "小学牛津版四年级下学期",
    "link": "?action=courses&classid=70"
}, {
    "classify":"小学英语",
    "name": "小学牛津版五年级上学期",
    "link": "?action=courses&classid=71"
}, {
    "classify":"小学英语",
    "name": "小学牛津版五年级下学期",
    "link": "?action=courses&classid=72"
}, {
    "classify":"小学英语",
    "name": "小学牛津版六年级上学期",
    "link": "?action=courses&classid=73"
}, {
    "classify":"小学英语",
    "name": "小学牛津版六年级下学期",
    "link": "?action=courses&classid=74"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第一册",
    "link": "?action=courses&classid=655"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第二册",
    "link": "?action=courses&classid=656"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第三册",
    "link": "?action=courses&classid=657"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第四册",
    "link": "?action=courses&classid=658"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第五册",
    "link": "?action=courses&classid=149"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第六册",
    "link": "?action=courses&classid=150"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第七册",
    "link": "?action=courses&classid=151"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第八册",
    "link": "?action=courses&classid=152"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第九册",
    "link": "?action=courses&classid=154"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第十册",
    "link": "?action=courses&classid=155"
}, {
    "classify":"小学英语",
    "name": "小学英语深圳版第十一册",
    "link": "?action=courses&classid=156"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 1",
    "link": "?action=courses&classid=265"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 2",
    "link": "?action=courses&classid=266"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 3",
    "link": "?action=courses&classid=267"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 4",
    "link": "?action=courses&classid=268"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语-Student Book 5",
    "link": "?action=courses&classid=269"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 6",
    "link": "?action=courses&classid=270"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 7",
    "link": "?action=courses&classid=271"
}, {
    "classify":"小学英语",
    "name": "河北版小学英语Student Book 8",
    "link": "?action=courses&classid=272"
}, {
    "classify":"初中英语",
    "name": "初中牛津版初一上学期",
    "link": "?action=courses&classid=57"
}, {
    "classify":"初中英语",
    "name": "初中牛津版-初一下学期",
    "link": "?action=courses&classid=58"
}, {
    "classify":"初中英语",
    "name": "初中牛津版初二上学期",
    "link": "?action=courses&classid=59"
}, {
    "classify":"初中英语",
    "name": "初中牛津版初二下学期",
    "link": "?action=courses&classid=60"
}, {
    "classify":"初中英语",
    "name": "初中牛津版初三上学期",
    "link": "?action=courses&classid=61"
}, {
    "classify":"初中英语",
    "name": "初中牛津版初三下学期",
    "link": "?action=courses&classid=62"
}, {
    "classify":"初中英语",
    "name": "初中人教版七年级上",
    "link": "?action=courses&classid=105"
}, {
    "classify":"初中英语",
    "name": "初中人教版七年级下",
    "link": "?action=courses&classid=106"
}, {
    "classify":"初中英语",
    "name": "初中人教版八年级上",
    "link": "?action=courses&classid=107"
}, {
    "classify":"初中英语",
    "name": "初中人教版八年级下",
    "link": "?action=courses&classid=108"
}, {
    "classify":"初中英语",
    "name": "初中人教版九年级",
    "link": "?action=courses&classid=109"
}, {
    "classify":"初中英语",
    "name": "仁爱版七年级上册",
    "link": "?action=courses&classid=221"
}, {
    "classify":"初中英语",
    "name": "仁爱版七年级下册",
    "link": "?action=courses&classid=222"
}, {
    "classify":"初中英语",
    "name": "仁爱版八年级上册",
    "link": "?action=courses&classid=223"
}, {
    "classify":"初中英语",
    "name": "仁爱版八年级下册",
    "link": "?action=courses&classid=224"
}, {
    "classify":"初中英语",
    "name": "仁爱版九年级上册",
    "link": "?action=courses&classid=225"
}, {
    "classify":"初中英语",
    "name": "仁爱版九年级下册",
    "link": "?action=courses&classid=226"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 1",
    "link": "?action=courses&classid=273"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 2",
    "link": "?action=courses&classid=274"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 3",
    "link": "?action=courses&classid=276"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 4",
    "link": "?action=courses&classid=277"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 5",
    "link": "?action=courses&classid=278"
}, {
    "classify":"初中英语",
    "name": "初中英语河北版Student Book 6",
    "link": "?action=courses&classid=279"
}, {
    "classify":"初中英语",
    "name": "新初中人教版新初中人教版八年级上",
    "link": "?action=courses&classid=728"
}, {
    "classify":"初中英语",
    "name": "新初中人教版新初中人教版八年级下",
    "link": "?action=courses&classid=729"
}, {
    "classify":"初中英语",
    "name": "冀教版九年级上册",
    "link": "?action=courses&classid=678"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高一上学期",
    "link": "?action=courses&classid=51"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高一下学期",
    "link": "?action=courses&classid=52"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高二上学期",
    "link": "?action=courses&classid=53"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高二下学期",
    "link": "?action=courses&classid=54"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高三上学期",
    "link": "?action=courses&classid=55"
}, {
    "classify":"高中英语",
    "name": "高中英语牛津版高三下学期",
    "link": "?action=courses&classid=56"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版必修1",
    "link": "?action=courses&classid=110"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版必修2",
    "link": "?action=courses&classid=111"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版必修3",
    "link": "?action=courses&classid=112"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版必修4",
    "link": "?action=courses&classid=113"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版必修5",
    "link": "?action=courses&classid=114"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版选修6",
    "link": "?action=courses&classid=118"
}, {
    "classify":"高中英语",
    "name": "高中英语人教版选修7",
    "link": "?action=courses&classid=119"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第一册)",
    "link": "?action=courses&classid=45"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第二册)",
    "link": "?action=courses&classid=46"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第三册)",
    "link": "?action=courses&classid=47"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第四册)",
    "link": "?action=courses&classid=48"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第五册)",
    "link": "?action=courses&classid=49"
}, {
    "classify":"大学英语",
    "name": "大学英语精读(第六册)",
    "link": "?action=courses&classid=50"
}, {
    "classify":"大学英语",
    "name": "新概念英语1",
    "link": "?action=courses&classid=41"
}, {
    "classify":"大学英语",
    "name": "新概念英语2",
    "link": "?action=courses&classid=42"
}, {
    "classify":"大学英语",
    "name": "新概念英语3",
    "link": "?action=courses&classid=43"
}, {
    "classify":"大学英语",
    "name": "新概念英语4",
    "link": "?action=courses&classid=44"
}, {
    "classify":"能力提升",
    "name": "短语动词",
    "link": "?action=courses&classid=719"
}, {
    "classify":"能力提升",
    "name": "要背就背有用单词",
    "link": "?action=courses&classid=713"
}, {
    "classify":"能力提升",
    "name": "CNN student news",
    "link": "?action=courses&classid=712"
}, {
    "classify":"能力提升",
    "name": "美国英语初级(上册)",
    "link": "?action=courses&classid=363"
}, {
    "classify":"能力提升",
    "name": "美国英语初级(下册)",
    "link": "?action=courses&classid=364"
}, {
    "classify":"能力提升",
    "name": "美国英语中级(上册)",
    "link": "?action=courses&classid=365"
}, {
    "classify":"能力提升",
    "name": "美国英语中级(下册)",
    "link": "?action=courses&classid=366"
}, {
    "classify":"能力提升",
    "name": "美国英语高级",
    "link": "?action=courses&classid=355"
}, {
    "classify":"能力提升",
    "name": "基础词汇",
    "link": "?action=courses&classid=362"
}, {
    "classify":"能力提升",
    "name": "Vocabulary 5000",
    "link": "?action=courses&classid=361"
}, {
    "classify":"能力提升",
    "name": "Vocabulary 22000",
    "link": "?action=courses&classid=359"
}, {
    "classify":"能力提升",
    "name": "Vocabulary 10000",
    "link": "?action=courses&classid=358"
}, {
    "classify":"能力提升",
    "name": "朗文2000释义词汇",
    "link": "?action=courses&classid=293"
}, {
    "classify":"能力提升",
    "name": "柯林斯星级词汇五星级词表",
    "link": "?action=courses&classid=125"
}, {
    "classify":"能力提升",
    "name": "柯林斯星级词汇四星级词表",
    "link": "?action=courses&classid=126"
}, {
    "classify":"能力提升",
    "name": "柯林斯星级词汇三星级词表",
    "link": "?action=courses&classid=127"
}, {
    "classify":"能力提升",
    "name": "柯林斯星级词汇二星级词表",
    "link": "?action=courses&classid=128"
}, {
    "classify":"能力提升",
    "name": "柯林斯星级词汇一星级词表",
    "link": "?action=courses&classid=129"
}, {
    "classify":"能力提升",
    "name": "牛津核心3000词汇（上）",
    "link": "?action=courses&classid=294"
}, {
    "classify":"能力提升",
    "name": "牛津核心3000词汇（下）",
    "link": "?action=courses&classid=725"
}, {
    "classify":"行业英语",
    "name": "医学英语第一册",
    "link": "?action=courses&classid=75"
}, {
    "classify":"行业英语",
    "name": "医学英语-第二册",
    "link": "?action=courses&classid=76"
}, {
    "classify":"行业英语",
    "name": "医学英语-第三册",
    "link": "?action=courses&classid=77"
}, {
    "classify":"行业英语",
    "name": "计算机常用词汇",
    "link": "?action=courses&classid=78"
}, {
    "classify":"行业英语",
    "name": "金融常用英语词汇",
    "link": "?action=courses&classid=79"
}, {
    "classify":"行业英语",
    "name": "交友常用词汇",
    "link": "?action=courses&classid=80"
}, {
    "classify":"行业英语",
    "name": "求职常用词汇",
    "link": "?action=courses&classid=81"
}, {
    "classify":"行业英语",
    "name": "人力资源词汇",
    "link": "?action=courses&classid=97"
}, {
    "classify":"行业英语",
    "name": "外贸行业必备",
    "link": "?action=courses&classid=98"
}, {
    "classify":"行业英语",
    "name": "建筑专业词汇",
    "link": "?action=courses&classid=147"
}, {
    "classify":"行业英语",
    "name": "化学（高分子）专业词汇",
    "link": "?action=courses&classid=721"
}, {
    "classify":"日常生活",
    "name": "过年必用单词",
    "link": "?action=courses&classid=726"
}, {
    "classify":"日常生活",
    "name": "身体各部位名称",
    "link": "?action=courses&classid=720"
}, {
    "classify":"日常生活",
    "name": "经典文学名著海蒂（上）",
    "link": "?action=courses&classid=684"
}, {
    "classify":"日常生活",
    "name": "经典文学名著卡夫卡是谁",
    "link": "?action=courses&classid=722"
}, {
    "classify":"日常生活",
    "name": "经典文学名著哈利波特与魔法石",
    "link": "?action=courses&classid=723"
}, {
    "classify":"日常生活",
    "name": "经典文学名著海蒂（下）",
    "link": "?action=courses&classid=685"
}, {
    "classify":"日常生活",
    "name": "经典文学名著哈利波特与阿兹卡班囚徒",
    "link": "?action=courses&classid=686"
}, {
    "classify":"日常生活",
    "name": "经典文学名著哈利.波特与密室",
    "link": "?action=courses&classid=689"
}, {
    "classify":"日常生活",
    "name": "经典文学名著木偶奇遇记（上）",
    "link": "?action=courses&classid=687"
}, {
    "classify":"日常生活",
    "name": "经典文学名著木偶奇遇记（下）",
    "link": "?action=courses&classid=688"
}, {
    "classify":"日常生活",
    "name": "经典文学名著一千零一夜 ",
    "link": "?action=courses&classid=690"
}, {
    "classify":"日常生活",
    "name": "经典文学名著傲慢与偏见（上）",
    "link": "?action=courses&classid=691"
}, {
    "classify":"日常生活",
    "name": "经典文学名著傲慢与偏见（下）",
    "link": "?action=courses&classid=692"
}, {
    "classify":"日常生活",
    "name": "经典文学名著白城恶魔",
    "link": "?action=courses&classid=693"
}, {
    "classify":"日常生活",
    "name": "经典文学名著麦田守望者",
    "link": "?action=courses&classid=694"
}, {
    "classify":"日常生活",
    "name": "经典文学名著小王子",
    "link": "?action=courses&classid=695"
}, {
    "classify":"日常生活",
    "name": "经典文学名著动物庄园",
    "link": "?action=courses&classid=697"
}, {
    "classify":"日常生活",
    "name": "经典文学名著1984",
    "link": "?action=courses&classid=698"
}, {
    "classify":"日常生活",
    "name": "经典文学名著瓶中信",
    "link": "?action=courses&classid=699"
}, {
    "classify":"日常生活",
    "name": "经典文学名著权力游戏（第一册）",
    "link": "?action=courses&classid=700"
}, {
    "classify":"日常生活",
    "name": "经典文学名著国境以南太阳以西",
    "link": "?action=courses&classid=701"
}, {
    "classify":"日常生活",
    "name": "看美剧攻略",
    "link": "?action=courses&classid=676"
}, {
    "classify":"日常生活",
    "name": "生活常用词汇",
    "link": "?action=courses&classid=175"
}, {
    "classify":"日常生活",
    "name": "海外生活美食篇",
    "link": "?action=courses&classid=145"
}, {
    "classify":"日常生活",
    "name": "海外生活家居篇",
    "link": "?action=courses&classid=144"
}, {
    "classify":"日常生活",
    "name": "海外生活气象篇",
    "link": "?action=courses&classid=146"
}, {
    "classify":"日常生活",
    "name": "旅行相关单词",
    "link": "?action=courses&classid=99"
}, {
    "classify":"日常生活",
    "name": "热门游戏词汇",
    "link": "?action=courses&classid=100"
}, {
    "classify":"日常生活",
    "name": "各类游戏集锦",
    "link": "?action=courses&classid=101"
}, {
    "classify":"日常生活",
    "name": "英雄联盟常用词汇",
    "link": "?action=courses&classid=730"
}, {
    "classify":"日常生活",
    "name": "化妆品",
    "link": "?action=courses&classid=87"
}, {
    "classify":"日常生活",
    "name": "颜色",
    "link": "?action=courses&classid=83"
}, {
    "classify":"日常生活",
    "name": "动物",
    "link": "?action=courses&classid=84"
}, {
    "classify":"日常生活",
    "name": "植物",
    "link": "?action=courses&classid=85"
}, {
    "classify":"日常生活",
    "name": "数学术语",
    "link": "?action=courses&classid=86"
}, {
    "classify":"日常生活",
    "name": "足球词汇集锦",
    "link": "?action=courses&classid=102"
}, {
    "classify":"日常生活",
    "name": "奥运会相关词汇",
    "link": "?action=courses&classid=82"
}, {
    "classify":"日常生活",
    "name": "电话常用词汇",
    "link": "?action=courses&classid=153"
}];

const fs = require('fs');
const fetch = require('./fetch');

const path = 'scripts/source';
function fetchBook(book){
    if(fs.existsSync(path+'/'+book.classify+'-'+book.name)){
        return Promise.resolve();
    }
    let t = [];
    let sections={};
    t.push('#classify:'+book.classify);
    t.push('#name:'+book.name);
    return fetch('http://word.iciba.com/'+book.link)
    .then(response=>{
        return response.text().then(text=>getCourseId(text,book.link.match(/[\d]{1,}/)))
    })
    .then(fetchCourse)
    .then((words)=>{
        words.reduce((p,c)=>{
            return p.concat(c);
        },[]).sort().forEach((w)=>{
            let letter=w[0].toUpperCase();
            let section;
            if(!(section=sections[letter])){
                section=[];
                sections[letter] = section;
            }
            section.push(w);
        });
        Object.keys(sections).forEach((m)=>{
            t.push('##'+m);
            t.push.call(t,sections[m]);
        })
        fs.createWriteStream(path+'/'+book.classify+'-'+book.name).end(t.join('\n'));
    }).catch((e)=>console.log(e,book))

}
function fetchCourse(courses){
    return Promise.all(
        courses.map((course)=>{
            let url = `http://word.iciba.com/?action=words&class=${course.classid}&course=${course.id}`;
            return fetch(url)
            .then(response=>response.text().then(text=>parseWords(text)))
        })
    )
}
function getCourseId(text,classid){
    let parts = text.match(/course_id=[\d]{1,}/gi);
    return parts.map((part)=>{

        return {id:part.match(/[\d]{1,}/),classid};
    });
    
}

function parseWords(text){
    let parts = text.match(/span title="[^"]+">/gi);
    return parts.map((part)=>{
        if(/title="([^"]+)"/.test(part)){
            return RegExp.$1;
        }
    })
}

function start(){
    let book = u.shift();
    if(book){
        return fetchBook(book).then(()=>setTimeout(start,1000));
    }
    // fetchBook({ classify: '初中英语',
    // name: '仁爱版八年级下册',
    // link: '?action=courses&classid=224' })
}

start();