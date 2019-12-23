//如何实现柯理化 ，反柯理化
//作业1
function fn(a, b, c) {
    return a + b + c
}

function fn(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}

//偏函数
function fn(a, b) {
    return function (c) {
        return a + b + c
    }
}