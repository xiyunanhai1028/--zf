
//实现一个Promise
const PENDING = 'Pending'
const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
class Promise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallBacks = []
        this.onRejectedCallBacks = []

        let resolve = (value) => {
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
        if (this.state === SUCCESS) {
            onFulfilled(this.value)
        }
        if (this.state === FAIL) {
            onRejected(this.reason)
        }
        if (this.state == PENDING) {
            console.log('pendding')
            this.onFulfilledCallBacks.push(() => { onFulfilled(this.value) })
            this.onRejectedCallBacks.push(() => { onRejected(this.reason) })
        }
    }
}

module.exports = Promise