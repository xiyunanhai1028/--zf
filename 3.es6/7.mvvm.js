//AOP面向切片编程，数据改变通知视图 vue
function update() {
    console.log('更新视图')
}

//如果是数组
//变异数组方法 shift unshift push splice reverse pop sort
//Object.create()继承
let oldProto = Array.prototype
let proto = Object.create(oldProto);
['shift', 'unshift', 'push', 'splice', 'reverse', 'pop', 'sort'].forEach(item => {
    proto[item] = function() {
        update()
        oldProto[item].apply(this, arguments)
    }
})

function observer(obj) {
    //判断obj是否是一个数组
    if (Array.isArray(obj)) {
        return obj.__proto__ = proto
    }
    //判断是不是对象
    if (typeof obj !== 'object') {
        return obj
    }

    //是一个对象，循环每一个属性
    for (const key in obj) {
        defineReactive(obj, key, obj[key])
    }
}

function defineReactive(obj, key, value) {
    //value也可能是一个对象
    observer(value)
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(newValue) {
            //设置的值可能是对象
            observer(newValue)
            if (value !== newValue) {
                value = newValue
                update()
            }
        }
    })
}

let obj = {
    name: '张三',
    age: 18,
    body: {
        w: 7
    }
}
observer(obj)
obj.body.w = 20
console.log(obj.body.w)
    // let arr = [1, 2, 3]
    // observer(arr)
    // arr.push(4)
    // console.log(arr)