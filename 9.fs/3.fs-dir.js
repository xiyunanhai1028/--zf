const fs = require('fs')
const path = require('path')
//1.先序深度同步遍历
// const rmdirSync = (filePath) => {
//     const statObj = fs.statSync(filePath)
//     if (statObj.isDirectory()) {//
//         let dirs = fs.readdirSync(filePath)//读取儿子目录
//         dirs = dirs.map(dir => path.join(filePath, dir))
//         dirs.forEach(dir => rmdirSync(dir))
//         fs.rmdirSync(filePath)//删除自己
//     } else {
//         fs.unlinkSync(filePath)//如果是文件删除即可
//     }
// }

// rmdirSync('a')

//2.先序深度异步遍历
// const rmdirAsync = (filePath, callback) => {
//     //获取状态
//     fs.stat(filePath, (err, statObj) => {
//         if (err) return new Error('出错了')
//         //.isFile判断是不是文件,statObj.isDirectory判断是不是目录
//         if (statObj.isDirectory()) {
//             fs.readdir(filePath, (err, dirs) => {
//                 if (err) return new Error('出错了')
//                 dirs = dirs.map(dir => path.join(filePath, dir))
//                 let index = 0
//                 const next = () => {
//                     if (index === dirs.length) return fs.rmdir(filePath, callback)
//                     rmdirAsync(dirs[index++], () => next())
//                 }
//                 next()
//             })
//         } else {
//             fs.unlink(filePath, (err, data) => {
//                 if (err) return new Error('出错了')
//                 callback()
//             })
//         }
//     })
// }
// rmdirAsync('a', () => console.log('删除成功'))

//3.先序深度异步并发遍历
// const rmdirAsync = (filePath, callback) => {
//     //状态
//     fs.stat(filePath, (err, statObj) => {
//         if (err) return new Error('出错了')
//         if (statObj.isDirectory()) {//是目录
//             //获取路径
//             fs.readdir(filePath, (err, dirs) => {
//                 console.log(dirs)
//                 //组装路径
//                 dirs = dirs.map(dir => path.join(filePath, dir))
//                 //如果没有孩子直接删除即可
//                 if (dirs.length === 0) return fs.rmdir(filePath, callback)
//                 let index = 0
//                 const done = () => {
//                     if (++index === dirs.length) {
//                         return fs.rmdir(filePath, callback)
//                     }
//                 }
//                 for (let i = 0; i < dirs.length; i++) {
//                     rmdirAsync(dirs[i], done)
//                 }
//             })
//         } else { //是文件
//             fs.unlink(filePath, ((err, data) => {
//                 if (err) return new Error('出错了')
//                 callback()
//             }))
//         }
//     })
// }
// rmdirAsync('a', () => console.log('删除成功'))


//4.Promise的写法
// const fs = require('fs').promises;
// const path = require('path')
// const removeDir = async (filePath) => {
//     //获取状态
//     const statObj = await fs.stat(filePath)
//     if (statObj.isDirectory()) {
//         //获取路径
//         let dirs = await fs.readdir(filePath)
//         console.log(dirs)
//         //先把儿子的删除的方法变成Promise
//         dirs = dirs.map(dir => removeDir(path.join(filePath, dir)))
//         //把儿子都删除成功后
//         await Promise.all(dirs)
//         await fs.rmdir(filePath)
//     } else {
//         await fs.unlink(filePath)
//     }
// }
// removeDir('a').then(() => console.log('删除成功'))

//5.宽度删除
const wideSync = (filePath) => { //['a]
    let arr = [filePath]//存放目录结构
    let index = 0
    let current
    while (current = arr[index++]) {//['a']
        let dirs = fs.readdirSync(current)
        dirs = dirs.map(dir => path.join(current, dir))
        arr = [...arr, ...dirs]
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        fs.rmdirSync(arr[i])
    }
}
wideSync('a')