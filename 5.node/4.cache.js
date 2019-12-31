/**
 * Module._load 加载模块
 * Module._resolveFilename 会自动添加.js .json .node 找到这个文件 返回一个绝对的路径
 * 模块就是一个对象，通过路径来创建 id,exports={}
 * module.load 加载当前创建的模块
 * Module._extensions 根据不同的后缀名来处理逻辑
 */
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(id) {
    this.id = id
    this.exports = {}
}

Module._cache={}

Module._extensions = {
    '.js'(module) {
        const script = fs.readFileSync(module.id, 'utf8')
        const functStr = wrapper[0] + script + wrapper[1]
        const fn = vm.runInThisContext(functStr)
        fn.call(module.exports, module.exports, module, myRequire)
    },
    '.json'(module) {
        const jsonStr = fs.readFileSync(module.id, 'utf8')
        const json = JSON.parse(jsonStr)
        module.exports = json
    }
}

let wrapper = [
    '(function(exports,module,require,__dirname,__filename){',
    '})'
]


Module.prototype.load = function () {
    //获取后缀
    const ext = path.extname(this.id)
    //根据不同的后缀名来处理逻辑
    Module._extensions[ext](this)
}

function myRequire(filePath) {
    //把当前的filePath转换为绝对路径
    const absPath = path.resolve(__dirname, filePath)
    let p = ''
    //判断文件是否存在
    try {
        fs.accessSync(absPath)
        p = absPath
    } catch (error) {
        //['.js','.json']
        const extensions = Object.keys(Module._extensions)
        extensions.some(ext => {
            const url = absPath + ext
            try {
                fs.accessSync(url)
                p = url
                return true
            } catch (error) {
                return false
            }
        })
    }

    if (p) {
        console.log(p)
        if(Module._cache[p]){
            return Module._cache[p].exports
        }
        console.log('----')
        //创建模块
        const module = new Module(p)
        Module._cache[p]=module
        //加载当前模块
        module.load()
        return module.exports
    } else {
        throw new Error('filePath no find')
    }
}
// const r=myRequire('./a.js')
const r = myRequire('./a')
b = myRequire('./b')
console.log(r)