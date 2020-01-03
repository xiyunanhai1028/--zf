const util=require('util')
const fs=require('fs')
const path=require('path')
//node api 所有的方法都是基于回调 第一个参数永远err

//util库
// const read=util.promisify(fs.readFile)
// read(path.resolve(__dirname,'1.txt'),'utf8').then(data=>console.log(data))

//源码分析，实现类似功能
function promisify(fn){
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn(...args,(err,data)=>{
                if(err){
                    return reject(err)
                }
                resolve(data)
            })
        })
    }
}

// const read=promisify(fs.readFile)
// read(path.resolve(__dirname,'1.txt'),'utf8').then(data=>console.log(data))

//实现类似blueBird的功能，直接将fs上所有方法转为promise
const promisifyAll=(obj)=>{
    for (let key in obj) {
        obj[key]=promisify(obj[key])
    }
}

promisifyAll(fs)
fs.readFile(path.resolve(__dirname,'1.txt'),'utf8').then(data=>console.log(data))


//继承 继承公有属性 原型上的属性
function Parent(){
    this.type='parent'
}

Parent.prototype.say=function(){
    console.log('say')
}

function Child(){

}

util.inherits(Child,Parent)//=>等价于Object.setPrototypeOf(Child.prototype,Parent.prototype)
const child=new Child()
child.say()