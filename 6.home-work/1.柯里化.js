//柯里化
//就是把参数先存起来，在执行到某个过程再拿出来组合使用
function add(a,b,c,d){
    return a+b+c+d
}
//把函数拆分成若干小的部分，方便组合
function currying(fn,arr=[]){//每次都到这个数组中
    let len=fn.length
    return (...args)=>{
        arr.push(...args)
        if(arr.length<len){//[1,2,3,4]==4
            return currying(fn,arr)
        }else{
            return fn(...arr)
        }
    }
}

let r=currying(add)(1)(2,3)(4)//先保存每次调用后的参数
console.log(r)

//柯里化实现判断数据类型
const isType=(type,content)=>{
    return Object.prototype.toString.call(content)===`[object ${type}]`
}
const isString=currying(isType)('String')
console.log(isString('123'))