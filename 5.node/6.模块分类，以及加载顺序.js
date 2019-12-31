/**
 * 模块分类：
 *  自己写的模块 require('../') 绝对路径 文件模块
 *  核心模块 require('fs') 没有路径 不用安装
 *  第三方模块 需要安装 用法和核心模块是一样的 会去当前目录下查找
 *  包 package.json 找不到才会找 index.js
 *  会向上级查找 每个node版本会有差异
 * 
 * 名字和文件相同 会找文件 如果没文件找文件夹，默认找index,index找不到在找
 * package.json=>main 找不到报错
 */