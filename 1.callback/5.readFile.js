//解决异步并发问题 核心是计数器
let fs = require('fs')

function after(times, callback) {
    let school = {}
    return (key, value) => {
        school[key] = value
        if (--times === 0) {
            callback(school)
        }
    }
}

let out = after(2, (school) => {
    console.log(school)
})

fs.readFile('./name.text', 'utf8', (err, data) => {
    if (!err) {
        out('name',data)
    }
})

fs.readFile('./age.text', 'utf8', (err, data) => {
    if (!err) {
        out('age',data)
    }
})  