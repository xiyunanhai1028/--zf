//发布订阅 订阅的时候 会把内容存到一个数组里
//发布的时候 需要循环数组一次执行

//真正的发布订阅 你可以维护一个列表 
const EventEmitter=require('./events')

// let event=new EventEmitter()
// event.on('吃饭',()=>console.log('吃饭前喝水'))
// event.on('吃饭',()=>console.log('吃饭前洗手'))
// event.emit('吃饭')//Pub Sub库


//继承
// const util=require('util')
// function Girl(){}
// util.inherits(Girl,EventEmitter)
// const girl=new Girl()
// girl.on('吃饭',()=>console.log('吃饭前喝水'))
// girl.on('吃饭',()=>console.log('吃饭前洗手'))
// girl.emit('吃饭')//Pub Sub库

//off
// const util=require('util')
// function Girl(){}
// util.inherits(Girl,EventEmitter)
// const girl=new Girl()
// girl.on('吃饭',()=>console.log('吃饭前喝水'))
// const listener=()=>console.log('吃饭前洗手')
// girl.on('吃饭',listener)
// girl.off('吃饭',listener)
// girl.emit('吃饭')//Pub Sub库

//newListener
// const util=require('util')
// function Girl(){}
// util.inherits(Girl,EventEmitter)
// const girl=new Girl()
// //会监听所有的on事件
// girl.on('newListener',(type)=>{
//     process.nextTick(()=>{
//         if(type==='data'){
//             girl.emit('data','123')
//         }
//     })
// })
// girl.on('newListener',(type)=>{
//     process.nextTick(()=>{
//         if(type==='data'){
//             girl.emit('data','456')
//         }
//     })
// })
// girl.on('data',(arg)=>console.log('绑定了data',arg))

//once
const util=require('util')
function Girl(){}
util.inherits(Girl,EventEmitter)
const girl=new Girl()
//会监听所有的on事件
girl.on('newListener',(type)=>{
    process.nextTick(()=>{
        if(type==='data'){
            girl.emit('data','123')
        }
    })
})
let listener=(arg)=>{//触发完依次后就会移除掉此方法
    console.log('绑定了data',arg)
}
girl.once('data',listener)
girl.off('data',listener)
girl.once('data',(arg)=>console.log('绑定了data',arg))
