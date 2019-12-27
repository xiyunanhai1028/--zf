let Promise = require('./promise')
let fs=require('fs').promises
//异步同步  让所有的异步 并发执行 有序输出
function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value != null)) {
        if (typeof value.then === 'function') {
            return true
        }
    }
    return false
}
Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let arr = []
        let num = 0
        processData = (key, value) => {
            arr[key] = value
            if (++num === values.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < values.length; i++) {
            let current = values[i]
            if (isPromise(current)) {
                current.then(x => {
                    processData(i, x)
                }, reject)
            } else {
                processData(i, current)
            }
        }
    })
}

Promise.all([fs.readFile('./name.txt','utf8'),fs.readFile('./age.txt','utf8'),2,4])
.then(data=>{
    console.log(data)
})