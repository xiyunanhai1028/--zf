//单线程    主线程  setTime ajax click
//进程中包含着线程

//主线程 UI  js  如果js是多线程会出现哪些问题
//默认地阿米执行的时候，会在执行栈中执行

function a(){//执行上下文  作用域  js静态作用域
    let x=1
    function b(){//作用域链
        console.log(x)
        function c(){

        }
        c()
    }
    b()
}
a()
//栈 先进后出
//队列 先进先出 [].push()  [].shift()

setTimeout(()=>{
    console.log(0)
})

setTimeout(()=>{
    console.log(1)
})

setTimeout(()=>{
    console.log(2)
})

Promise.resolve().then(()=>{//promise setTimeout
    console.log('then')
})
console.log('logger')
//=>logger,then,0,1,2



async function async1(){
    console.log('async1 start')
    await async2()//这里跟版本有关系，10以下，会编辑成一个then
    console.log('async1 end')
}

async function async2(){
    console.log('async2')
}

console.log('script start')

setTimeout(function(){
    console.log('setTimeout')
})

async1()

new Promise(function(resolve){
    console.log('promise1')
    resolve()
}).then(function(){
    console.log('promise2')
})

console.log('script end')
// script start
// async1 start
// async2
// promise1
// script end
// promise2
// async1 end
// setTimeout
