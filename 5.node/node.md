## node

### 1.	进程和线程

+ 任务管理管理的是进程，管理的最小的单位就是进程
+ 进程是包含线程的 node js语法 主线程单进程  基于v8
+ js：组成部分BOM，DOM，ECMAScript
+ node：（ECMAScript）+内置有个libuv库 (fs,http...)
+ node可以提供一个高性能的web开发服务
+ 开发工具webpack  解决中间层问题（解决跨域） 服务器渲染（首页白屏  seo优化  spa  mpa）  纯后端  react+vue  

### 2.    稳定性

+ 用node来做服务 可以开启多个进程  子进程  进程之间的通信
+ pm2
+ 一个cpu 开启一个进程

### 3.    单线程和多线程的区别

+ java 对文件的I/O操作并不合适  适合CPU密集型的计算，压缩等处理
+ node适合 I/O操作  异步的I/O 通过事件来驱动
+ node中为了实现异步的I/O，通过了多线程模拟了异步

### 4.    同步和异步，阻塞和非阻塞

+ 被调用者来决定同步和异步
+ 调用者的状态  阻塞和非阻塞

### 5.    scripts脚本配置

可以帮助执行node_modules下.bin目录的文件

```javascript
"scripts":{
    "mime":"mime",
    "test" :"echo \"Error:no test specified\" && exit 1"   
}

//在命令下执行
npm run mime
```

### 6.	npx的使用

+ 可以直接执行.bin目录下的文件
+ 可以安装模块，使用后悔自动删除

### 7.    npm发布模块

```javascript
nrm use npm 
npm addUser
npm publish
```

