/**
 * Module._load 加载模块
 * Module._resolveFilename 会自动添加.js .json .node 找到这个文件 返回一个绝对的路径
 * 模块就是一个对象，通过路径来创建 id,exports={}
 * module.load 加载当前创建的模块
 * Module._extensions 根据不同的后缀名来处理逻辑
 */
const path=require('path')
const fs=require('fs')
const vm=require('vm')

function Module(id){
    this.id=id
    this.exports={}
}

Module._extensions={
    '.js'(){},
    '.json'(){

    }
}

let wrapper=[
    '(function(exports,module,require,__dirname,__filename){',
    '})'
]

Module._extensions['.js'] = function(module){
    const script=fs.readFileSync(module.id,'utf8')
    const functStr=wrapper[0]+script+wrapper[1]
    const fn=vm.runInThisContext(functStr)
    fn.call(module.exports,module.exports,module,myRequire)
}

Module._extensions['.json']=function(module){
    const jsonStr=fs.readFileSync(module.id,'utf8')
    const json=JSON.parse(jsonStr)
    module.exports=json
}

Module.prototype.load=function(){
    //获取后缀
    const ext=path.extname(this.id)
    //根据不同的后缀名来处理逻辑
    Module._extensions[ext](this)
} 

function myRequire(filePath){
   //把当前的filePath转换为绝对路径
   const absPath=path.resolve(__dirname,filePath)
   //创建模块
   const module=new Module(absPath)
   //加载当前模块
   module.load()
   
   return module.exports
}
// const r=myRequire('./a.js')
const r=myRequire('./b.json')
console.log(r)