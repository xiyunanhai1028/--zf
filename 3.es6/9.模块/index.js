//以前的模块 amd cmd umd
/**
 * es6模块 和 node模块的区别
 *  es6是esmodule，node模块是 commonjs规范
 *  es6是静态，只能在最外层使用
 *  node是动态的 代码块中可以使用
 *  es6 import   node require
 * 
 * 模块化的好处
 *  封装 保护变量名称不冲突
 * 
 * 导入 import  导出 export
 */
import a from './a'
console.log(a)

import _,{c,b} from './a'


//实验型语法里 import() 动态的导入
///*webpackChunName: "MyFile" */修改文件名称的，打包后才会有效
import(/*webpackChunName: "MyFile" */'./a').then(data=>{
    console.log(data)
})