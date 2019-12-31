//反柯理化
add=a=>b=>c=>d=>{
    return a+b+c+d
}

//反柯理化 放大函数适用范围  别人的东西我可以拿过来直接用 这里的this我可以手动传入
function uncurrying(fn){
    return (...args)=>{
        args.forEach(item=>{
            fn=fn(item)
        })
        return fn
    }
}

let r=uncurrying(add)(1,2,3,4)
console.log(r)

//判断类型
//将Object.prototype.toString.call(1)拆分，不用每次都要用Object.prototype.toString
function unCheckType(fn){
    return (...args)=>{
        return fn.call(...args)
    }
}
const checkType=unCheckType(Object.prototype.toString)
const r=checkType(1)
console.log(r)//[object Number]


//---------------------
Function.prototype.uncurrying=function(){
    return (...args)=>{
        //Function.prototype.call 取到call的方法
        //call / apply的作用  1，改变this指向 2，让函数执行
        //let callFunction=Function.prototype.call
        //callFunction 中的this 变成 Object.prototype.toString
        //Object.prototype.toString.call(this)
        //return Function.prototype.call.apply(this,args)
        return this.call(this, args)
    }
}

let checkType=Object.prototype.toString.uncurrying()
console.log(checkType(1))
