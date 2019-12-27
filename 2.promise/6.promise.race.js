let Promise = require('./promise')
let fs = require('fs').promises
//比谁跑的快，如果一个失败就失败，如果一个成功就成功
function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value !== null)) {
        if (typeof value.then === 'function') {
            return true
        }
    }
    return false
}

Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            let current = values[i]
            if (isPromise(current)) {
                current.then(resolve, reject)
            } else {
                resolve(current)
            }
        }
    })
}

// Promise.race([11, 23])
//     .then(data => console.log(data), err => console.log(err))

//中断Promise
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 3000)
})

function wrap(promise) {
    let about
    let newPromise = new Promise((resolve, reject) => {
        about = reject
    })
    let p = Promise.race([newPromise, promise])
    p.about = about
    return p
}

let p1 = wrap(p)

setTimeout(() => {
    console.log('中断操作')
    p1.about('err')
}, 2000)

p1.then((value) => {
    console.log('没中断走这个')
},err=>{
    console.log(err)
})