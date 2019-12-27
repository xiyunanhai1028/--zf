//set map 不能放重复类型 是一种数据结构
let s = new Set([1, 2, 3])
    //set 他是具备 Symbol.iterator

s.add(3)
console.log(s)
console.log(s.entries()) //Object.keys,Object.values,Object.entries
s.forEach(item => console.log(item))
console.log(s.has(2))

//数组去重 交集 并集  差集
let arr1 = [1, 2, 1, 2, 3]
let arr2 = [4, 5, 5, 6, 2, 3]

//去重
function union() {
    let s = new Set([...arr1, ...arr2])
    return [...s] //s是一个类数组
}
console.log(union())

//交集
function intersection(arr1, arr2) {
    let s1 = new Set(arr1)
    let s2 = new Set(arr2)
    return [...s1].filter(item => s2.has(item))
}
console.log(intersection(arr1, arr2))

//差集
function differrence(arr1, arr2) {
    let s1 = new Set(arr1)
    let s2 = new Set(arr2)
    return [...s1].filter(item => !s2.has(item))
}
console.log(differrence(arr1, arr2))

//Map
let map = new Map([
    ['name', 'zhangsan']
])
console.log(map)
console.log(map.get('name')) //=>zhangsan

map.set('name', 'lisi')
console.log(map.get('name'))

//weakMap 弱引用 v8 垃圾回收的机制
//http://www.javascriptpeixun.cn/course/12