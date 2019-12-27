
//实现一个Promise
const PENDING = 'Pending'
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        return reject(new
            TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }

    let called
    if (typeof x === 'function' || (typeof x === 'object' && x != null)) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, error => {
                    if (called) return
                    called = true
                    reject(error)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }

    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallBacks = []
        this.onRejectedCallBacks = []

        let resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.state === PENDING) {
                this.state = SUCCESS
                this.value = value
                this.onFulfilledCallBacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = FAIL
                this.reason = reason
                this.onRejectedCallBacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === SUCCESS) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.state === FAIL) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })

            }
            if (this.state == PENDING) {
                this.onFulfilledCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.onRejectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
        return promise2
    }

    catch(callBack) {
        this.then(null, callBack)
    }
}

Promise.resolve = function (callBack) {
    return new Promise((resolve, reject) => {
        resolve(callBack)
    })
}
Promise.reject = function (callBack) {
    return new Promise((resolve, reject) => {
        reject(callBack)
    })
}
Promise.prototype.finally = function (callBack) {
    return this.then(data => {
        return Promise.resolve(callBack()).then(() => data)
        // callBack()
        // return data
    }, err => {
        return Promise.resolve(callBack()).then(() => err)
        // callBack()
        // throw err
    })
}

//测试
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise