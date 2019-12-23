//高阶函数：函数的参数，或者返回值是函数，就是高阶函数

//AOP 面向切片编程

function say(name) {
    console.log(`${name}:说`)
}

Function.prototype.before = function (beforeFunc) {
    //箭头函数没有this,也没有arguments
    return (...args) => {
        beforeFunc()
        this(...args)
    }
}

let beforeSay = say.before(() => {
    console.log(`说话前`)
})

beforeSay(`张三`)