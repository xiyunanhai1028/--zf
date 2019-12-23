/**
 * Promise  解决的问题
 *  1.回调嵌套  回调地狱
 *  2.错误捕获不好处理错误
 *  3.多个异步同步问题 Promise.all
 * 
 * Promise是一个类  默认浏览器高版本 node 都是自带了
 * es6-promise
 * 
 * Promise的概念    规范文档    promise A+ 规范
 * Promise  三个状态 等待（Pending）,成功（fulfilled），失败（rejected）
 * 只有等待态 才能变成成功/失败
 * 如果状态变化，不能在修改状态
 */
let fs=require('fs')
let Promise = require('./promise')
let p = new Promise((resolve, reject) => {//executor:执行器
    throw new Error('报错啦')
    fs.readFile('./name.text','utf8',(err,data)=>{
        if(err){
            return reject(err)
        }
        resolve(data)
   })
})

p.then((value) => {//fulfilled
    console.log(value)
}, (reason) => {//rejected
    console.log(reason)
})

p.then((value) => {//fulfilled
    console.log(value)
}, (reason) => {//rejected
    console.log(reason)
})


