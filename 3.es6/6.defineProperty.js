//defineProperty定义属性

//getter setter属性访问器

let obj = {
    _url: '',
    get url() {
        return this._url
    },
    set url(value) {
        this._url = value
    }
}

obj.url = 'www.baidu.com'
console.log(obj.url)

let obj = {}
let other = ''
Object.defineProperty(obj, 'name', {
    enumerable: true, //是否可枚举
    configurable: true, //是否可以修改
    // writable: true, //是否可写 和 value连用
    // value: 100,
    get() {
        return other
    },
    set(val) {
        other = val
    }
})
obj.name = 'zhanghui'
console.log(obj.name)