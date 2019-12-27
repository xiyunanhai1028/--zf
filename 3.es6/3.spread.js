let { length } = []
console.log(length)

//数组省略第一项
let [, age] = ['zhangshan', 18]
console.log(age)

//对象的展开
let arr = [1, 2, 3]
let arr2 = [4, 5, 6]
let arr3 = [...arr, ...arr2]
console.log(arr3)

let obj = { name: 'zhangsan' }
let obj2 = { age: 9 }
let obj3 = {...obj, ...obj2 }
console.log(obj3)

//数组
let [, ...args] = [1, 2, 3, 4, 5]
console.log(args)

let { name, ...args } = { name: 'zhangsan', age: 18, sex: '男' }
console.log(name)
console.log(args)

//将类数组转化为数组：
//Array.from()  [...{}] 是通过迭代器来实现的
let arr1 = Array.from({ 0: 1, 1: 2, 2: 3, length: 3 })
console.log(arr1) //=>[ 1, 2, 3 ]

let arr2 = [... { 0: 1, 1: 2, 2: 3, length: 3 }]
console.log(arr2) //=>is not iterable
    //Array.from 与 [...{}]区别在于Symbol.itrator
let arr3 = [... {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function*() {
        //yiled 值
        let i = 0
        while (this.length != i) {
            yield this[i++] //{value:0,done:false}
        }
    }
}]
console.log(arr3) //=>[ 1, 2, 3 ]

//浅拷贝 Object.assign ... 如果是多层的话 就是浅拷贝 浅拷贝是两个对象还有关系
let obj1 = {
    name: '张三',
    age: 18
}
let obj2 = {...obj1 }
obj1.age = 20
console.log(obj2) //{ name: '张三', age: 18 } age没有改变 两个没有关系了 就是深拷贝

let obj3 = {
        name: '张三',
        age: 18,
        body: {
            h: 18,
            w: 80
        }
    }
    //这里用...或者Object.assign一样效果，body:地址引用一样 一个改变都改变,为浅拷贝
let obj4 = Object.assign(obj3)
obj3.body.h = 40
console.log(obj4)