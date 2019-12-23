//判断数据类型
let types = ['String', 'Number', 'Array', 'Undefined', 'Null', 'Boolean']

let utils = {}

for (let i = 0; i < types.length; i++) {
    const type = types[i]
    utils[`is${type}`] = isType(type)
}

function isType(type) {
    return (content) => {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}

let flag=utils.isString('hello')
console.log(flag)