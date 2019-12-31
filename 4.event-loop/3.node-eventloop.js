//node的事件环，libuv实现的一个事件环机制
//https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
//timers-->pending callbacks-->idle,prepare-->pop-->check-->close callbacks
//setTimeout与setImmediate不确定那个先执行，这个跟电脑性能有关系
setTimeout(()=>{
    console.log('timeout')
})

setImmediate(()=>{
    console.log('immediate')
})

//在IO里面一定是immediate先执行
let fs=require('fs')
fs.readFile('./work.js','utf8',()=>{
    setTimeout(()=>{
        console.log('timeout')
    })
    
    setImmediate(()=>{
        console.log('immediate')
    })
})

//如果希望当前主栈中代码执行后 就可以使用nextTick 微任务
Promise.resolve().then(()=>{
    console.log('then')
})

process.nextTick(()=>{
    console.log('nextTick')
})

//timers pop check 主要是这三个比较   