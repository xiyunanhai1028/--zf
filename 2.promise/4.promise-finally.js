let Promise = require('./promise')

// Promise.prototype.finally=function(callBack){

// }
// let p=new Promise((resolve,reject)=>{
//     let promise= new Promise((resolve,reject)=>{
//         resolve(111)
//     })
//     return resolve(promise)
// })

// p.then((data)=>{
//     console.log(data)
//     throw 2
// },err=>{
//     console.log(err)
// }).catch((err) => {
//     console.log(err)
// })

Promise.resolve = function (callBack) {
    return new Promise((resolve, reject) => {
        resolve(callBack)
    })
}
Promise.reject = function (callBack) {
    return new Promise((resolve, reject) => {
        reject(callBack)
    })
}
Promise.prototype.finally = function (callBack) {
    return this.then(data => {
        return Promise.resolve(callBack()).then(() => data)
        // callBack()
        // return data
    }, err => {
        return Promise.resolve(callBack()).then(() => err)
        // callBack()
        // throw err
    })
}
new Promise((resolve, reject) => {
    resolve()
}).finally(() => {
    // console.log('finally')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('finally')
            resolve()
        }, 1000)
    })
}).then(() => {
    console.log('111')
})