//生成器==>迭代器的iterator
//函数 里面的生命 * yield 来实现
//throw 异常处理
//会暂停

// function* read() {
//     yield 1
//     yield 2
//     yield 3
// }

// let it = read()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// function* read() {
//     let a=yield 1
//     console.log(a)
//     let b=yield 2
//     console.log(b)
//     let c=yield 3
//     console.log(c)
// }

// let it = read()
// it.next()
// // it.throw('出错了')
// it.next('hello')
// it.next()
// it.next()

//generator+promise使用
// let fs = require('fs').promises
// function* read() {
//     try {
//         let content = yield fs.readFile('./name.txt', 'utf8')
//         let age = yield fs.readFile(`./${content}`, 'utf8')
//         return age
//     } catch (error) {
//         console.log(error)
//     }
// }

// let it = read()
// let { value, done } = it.next()
// value.then(data => {
//     console.log(data)
//     let {value,done}=it.next(data)
//     value.then(data=>{
//         console.log(data)
//     },err=>it.throw(err))
// }, err => {
//     it.throw(err)
// })

//co 库
let fs = require('fs').promises
let Promise = require('./promise')
function* read() {
    let content = yield fs.readFile('./name.txt', 'utf8')
    let age = yield fs.readFile(`./${content}`, 'utf8')
    return age
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let { value, done } = it.next(data)
            if (!done) {
                value.then(data => {
                    next(data)
                }, err => {
                    reject(err)
                })
            } else {
                resolve(value)
            }
        }
        next()
    })
}

co(read()).then(data => { console.log(data) }, err => console.log(err))

//async await 就是 generator+co