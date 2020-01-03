//fs
//文件操作 目录操作
//fs.readFile writeFile appendFile
//fs.access fs/state
//fs.mkdir fs.rmdir
//fs.rname fs.unlink
//fs.readdir

//同步
// const fs = require('fs')
// let path = 'a/b/c/d'
// const mkdir = (pathUrl) => {
//     let arrPath = pathUrl.split('/')
//     console.log(arrPath)
//     for (let i = 0; i < arrPath.length; i++) {
//         let current = arrPath.slice(0, i + 1).join('/')
//         try {
//             fs.accessSync(current)
//         } catch (error) {
//             fs.mkdirSync(current)
//         }
//     }
// }
// mkdir(path)


//异步
const fs = require('fs')
let path = 'c/d/e/f'
const mkdir = (pathUrl, callback) => {
    let arrPath = pathUrl.split('/')
    const next = (index) => {
        if (index === arrPath.length) return callback()
        let current = arrPath.slice(0, ++index).join('/')
        fs.access(current, (err, data) => {
            if (err) {
                fs.mkdir(current, () => next(index))
            } else {
                next(index)
            }
        })

    }
    next(0)
}
mkdir(path, () => console.log('创建成功'))
