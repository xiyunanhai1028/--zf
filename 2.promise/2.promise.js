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