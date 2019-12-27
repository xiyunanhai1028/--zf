//export 只能导出一个接口
export let a = 1
export let b = 2

//一起导出a,b两个接口
let a=1
let b=2
export {
    a, b
}

//as 语法可以重命名
export { a as c}

//default带出的是值
export default 'hello'
//接收 import _ from '.'来接收