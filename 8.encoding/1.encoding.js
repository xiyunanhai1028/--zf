//将gbk编码转为utf8
//iconv-lite可以将gbk转为utf8
const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const r = fs.readFileSync(path.resolve(__dirname, 'a.txt'))
console.log(r)

const result = iconv.decode(r, 'gbk')
console.log(result)

//进制和每个编码不对应的

//进制转化
//将任意进制转化成10进制  
console.log(parseInt('0xff', 16))//=>255
console.log(parseInt('111', 2))//=>7
//将10进制转化成任意进制
console.log(100..toString(16))//=>64,第一个点代表小数点，第二个代表调用方法
console.log(0x16.toString(8))//=>26

//0.1+0.2===0.3 ？ 怎么解决这种问题

//Buffer global上的属性 他表示是内存 但是 把二进制变成了16进制存起来
//2进制 8个1 =255
//255转为十六进制 0xff
console.log(255..toString(16))//=>0xff

//Buffer三种声明方式
let buffer = Buffer.alloc(3)
buffer = Buffer.from('张三')
buffer = Buffer.from([0x16, 0x22])
console.log(buffer)

//对buffer进行操作 大小不能改变
let buf1 = Buffer.from('张三')
let buf2 = Buffer.from('李四')
let buff = Buffer.alloc(12)

//copy拷贝
// buf1.copy(buff,0,0,6)
// buf2.copy(buff,6,0,6)
// console.log(buff.toString())//=>张三李四
//targetBuffer, targetStart, sourceStart, sourceEnd
//实现拷贝源代码
Buffer.prototype.myCopy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
    for (let i = 0; i < sourceEnd - sourceStart; i++) {
        targetBuffer[targetStart + i] = this[i]
    }
}
buf1.myCopy(buff, 0, 0, 6)
buf2.myCopy(buff, 6, 0, 6)
console.log(buff.toString())//=>张三李四

//concat
// let newBuffer=Buffer.concat([buf1,buf2])
// console.log(newBuffer.toString())
//实现concat源码
Buffer.myConcat = function (bufferList, len = bufferList.reduce((a, b) => a + b.length, 0)) {
    let buffer = Buffer.alloc(len)
    let offset = 0
    bufferList.forEach(item => {
        item.copy(buffer, offset, 0, item.length)
        offset += item.length
    })
    return buffer
}
let newBuffer = Buffer.myConcat([buf1, buf2])
console.log(newBuffer.toString())

//concat toString slice isBuffer length字节长度
//indexOf
let b = Buffer.from('我是中国中国人中果')
// console.log(b.indexOf('中',1))
//扩充split方法，Buffer中没有这个方法
Buffer.prototype.split = function (sep) {
    let arr = []
    let offset = 0
    let current
    let len = Buffer.from(sep).length
    while (-1 != (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current).toString())
        offset = current + len
    }
    arr.push(this.slice(offset).toString())
    return arr
}
let arr = b.split('中')
console.log(arr)

//base64不是加密解密,是一种编码
//将3*8转为4*6
let bu = Buffer.from('中')
console.log(bu)//e4 b8 ad 十六进制
//转为2进制
console.log(0xe4.toString(2))
console.log(0xb8.toString(2))
console.log(0xad.toString(2))
//11100100 10111000 10101101  3*8 转为4*6
//111001 001011 100010 101101 4*6
//转为十进制
console.log(parseInt('111001', 2))
console.log(parseInt('001011', 2))
console.log(parseInt('100010', 2))
console.log(parseInt('101101', 2))
//57 11 34 45
let str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '0123456789+/'
console.log(str[57] + str[11] + str[34] + str[45])

console.log(Buffer.from('中').toString('base64'))








