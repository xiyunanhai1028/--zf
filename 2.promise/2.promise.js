<<<<<<< HEAD
let fs = require('fs')
let Promise=require('./promise')
function read(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}

read('e:/HTML/珠峰培训/架构课程/name.text').then(data => {
    console.log('成功1！')
}, err => {
    console.log('失败！')
}).then(data => {
    console.log('成功2！')
}, err => {
    console.log(err)
})
=======
/***
 * promise的链式调用（如果是一个Promise就不是普通值）
 * 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then的失败回调
 * 如果then方法返回了一个失败的promise他会走外层then的失败的回调
 * 
 */
>>>>>>> 29d2f1fc909e8383473b58723113e8e4a7dc081f
