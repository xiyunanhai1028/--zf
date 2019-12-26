//深拷贝的实现
//第一种方法：通过JSON.stringify
//这种拷贝的缺陷，undefined,function会丢失,正则会拷贝不上
let obj1 = {
    name: 'zhangsan',
    option: {
        h: 20,
        w: 80,
    },
    sex: undefined,
    reg: /\d+/,
    fn: () => {}
}

let obj2 = JSON.parse(JSON.stringify(obj1))
console.log(obj2) //{ name: 'zhangsan', option: { h: 20, w: 80 }, reg: {} }

//方法二：
function deepClone(value, hash = new WeakMap()) {
    if (value == null) { //null和undefined 是不需要拷贝的  null==undefined//=>true  null===undefined//=>false
        return value
    }

    if (value instanceof RegExp) { //判断是否是正则的实例
        return new RegExp(value)
    }

    if (value instanceof Date) { //判断是否是Date的实例
        return new Date(value)
    }

    //函数是不需要拷贝
    if (typeof value != 'object') return value

    //判断是对象或者是数组
    //Object.prototype.toString.call(value)
    //value.constructor==Array或者Object
    let obj = new value.constructor() //[] {}

    //说明是一个对象类型
    if (hash.get(value)) {
        return hash.get(value)
    }
    hash.set(value, obj)

    for (let key in value) { //in循环会遍历私有属性+_proto_的公有属性
        //只需要拷贝私有属性
        if (value.hasOwnProperty(key)) {
            //value[key]的值可能会是[]或者{}
            obj[key] = deepClone(value[key], hash)
        }
    }
    return obj
}

let obj3 = {
    reg: /\d+/,
    date: new Date(),
    arr: [1, 2, 3],
    arr2: [
        [1, 2, 3]
    ],
    o: {
        name: 'zz',
        age: 18
    }
}
let obj4 = deepClone(obj3)
console.log(obj4)

let o = {}
o.x = o
let o1 = deepClone(o)
console.log(o1)