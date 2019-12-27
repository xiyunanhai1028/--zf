

let Promise = require('./promise')
let p1 = new Promise((resolve, reject) => {
    resolve()
})

let p2 = p1.then(() => {
    return new Promise((resolve, reject) => {
        resolve(1)
    })
}, () => {

})
let p3 = p2.then((value) => {
    throw 1
}, err => {
    
}).then(() => { }, err => {
    console.log(err)
})