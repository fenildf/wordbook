const fetch = require('./../scripts/fetch');

test('test fetch',function(){
    return fetch('http://www.baidu.com').then(res=>{
        return res.text().then(
            v=>{
                expect(typeof v === 'string').toBeTruthy();
            }
        )
    })
})