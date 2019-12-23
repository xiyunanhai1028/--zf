/**
 * 观察者模式 他是基于发布订阅模式的
 * 发布订阅 两者没有直接关系
 * 观察者模式   被观察的    观察者 vue
 * 把观察者放到被观察者中
 */

//观察者模式
class Subject {//被观察者
    constructor() {
        this.stack = []
    }
    attach(observer) {
        this.stack.push(observer)
    }

    setState(newState) {
        this.stack.forEach(observer => observer.updata(newState))
    }
}

class Observer {//观察者
    constructor(name) {
        this.name = name
    }

    updata(state) {
        console.log(`${this.name}获取到${state}`)
    }
}

let sub = new Subject()
let ob1 = new Observer('观察者1')
let ob2 = new Observer('观察者2')
sub.attach(ob1)
sub.attach(ob2)
sub.setState('发布新消息')