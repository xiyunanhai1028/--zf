//解决异步并发问题 核心是计数器
let fs = require('fs')

class Event {
    constructor() {
        this.stack = []
    }
    on(func) {
        this.stack.push(func)
    }

    emit() {
        this.stack.forEach(func => func())
    }
}

let event = new Event()
let school = {}

event.on(() => {
    console.log('当前获取完备')
})

event.on(() => {
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
})

fs.readFile('./name.text', 'utf8', (err, data) => {
    if (!err) {
        school.name = data
        event.emit()
    }
})

fs.readFile('./age.text', 'utf8', (err, data) => {
    if (!err) {
        school.age = data
        event.emit()
    }
})  