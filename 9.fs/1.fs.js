//同步方法的好处 速度快 可以立即拿到返回结果 阻塞主线程
//异步的好处 不会阻塞主线程 callback async+await
const fs = require('fs')
const path = require('path')
const resolve = (filePath) => {
    return path.resolve(__dirname, filePath)
}
//这种读取文件的方式不适合大文件，文件过大 可能会导致淹没可用内存
//小于64k的
// fs.readFile(resolve('./a.txt'), (err, data) => {
//     if (err) return new Error('读取错误')
//     //一个文件中可以包含多个编码格式 存储的都是二进制
//     fs.writeFile(resolve('./b.txt'), data, (err) => {
//         if (err) return new Error('写入错误')
//         console.log('拷贝成功！')
//     })
// })

//fs.open fs.read fs.write fs.close实现边读边写
//分组分为三组 1.我自己的权限 2.我所在组的权限 3.其他人的权限
fs.open(resolve('./a.txt'), 'r', (err, rfd) => {//file descriptor
    if (err) return new Error('打开出错')
    fs.open(resolve('./c.txt'), 'w', 0o666, (err, wfd) => {//0o666=438有三个权限
        let buffer = Buffer.alloc(3)
        let roffset = 0
        let woffset = 0
        //window 3开始 1024
        //读取和写入相反的 读取往电脑内存中写入，写入是将内存中的数据写到磁盘
        let next = () => {

            //fd, buffer, offset, length, position, callback: (err, bytesRead, buffer)
            fs.read(rfd, buffer, 0, 3, roffset, (err, bytesRead) => {
                if (bytesRead === 0) {
                    fs.close(rfd, () => { })
                    fs.close(wfd, () => { })
                }
                roffset += bytesRead
                //fd, buffer, offset, length, position, callback: (err, written, buffer
                fs.write(wfd, buffer, 0, 3, woffset, (err, written) => {
                    woffset += written
                    next()
                })
            })
        }
        next()
    })

})