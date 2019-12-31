// console.log(Object.keys(global))

//global  
//process  进程
//Buffer 16进制
//clearImmediate clearInterval clearTimeout
//setImmediate setInterval setTimeout

// console.log(this)//=>{} module.exports 我们文件在执行的时候为了实现模块化 外面特意套了一个函数而且this指向被改变了

// console.log(Object.keys(process))
//argv
//env
//chdir
//nextTick

// console.log(process.argv.slice(2))
// let argv=process.argv.slice(2).reduce((prev,current,index,arr) => {
//     if(current.includes('--')){
//         prev[current.slice(2)]=arr[index+1]
//     }
//     return prev
// }, {})
// console.log(argv)

//tj co commander
const program = require('commander');
program.version('0.0.1')
    .option('-p,--port <value>', 'config port')
    .parse(process.argv);
console.log(program.port)

//env环境变量 export(mac) | set(windows)  NODE_TEST=production
//开发的时候 可能用到url 是 www.test.cn  www.dev.cn
let url=''
if(process.env.NODE_TEST=='production'){
    url='www.test.cn'
}else{
    url='www.dev.cn'
}
console.log(url)

//chdir changeDiretory 当前进程的工作目录
//process.chdir('1.node')
console.log(process.cwd())

//nextTick  promise.then()