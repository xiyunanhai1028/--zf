//代理 proxy  vue3.0使用的这个
//proxy defineProperty区别：
//proxy性能不如defineProperty
//proxy能监听Array方法的变化，如shift

let obj = {
    name: '张三',
    age: 18
}

let arr = [1, 2]

let handler = {
    get(target, key) {
        return Reflect.get(target, key) //反射
            //return target[key]
    },
    set(target, key, value) {
        console.log('updata', key)
            //为数组是会触发两次更新，一次为下标，一次为数据
        if (key == 'length') return true
        return Reflect.set(target, key, value)
    }
}

let proxy = new Proxy(arr, handler)

// proxy.age = 30
// console.log(obj)

proxy.push(3)
console.log(arr)