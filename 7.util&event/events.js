function EventEmitter(){
    //这里不适用{}，是因为{}会带有__proto__
    this._events=Object.create(null)
}

//订阅 创建关系
EventEmitter.prototype.on=function(eventName,callback){
    if(!this._events){
        this._events=Object.create(null)
    }

    if(eventName!=='newListener'){
        if(this._events['newListener']){
            this._events['newListener'].forEach(fn => fn(eventName))
        }
    }
    let arr=this._events[eventName] || (this._events[eventName]=[])
    arr.push(callback)
}

//once
EventEmitter.prototype.once=function(eventName,callback){
    const once=(...args)=>{//高阶函数
        callback(...args)//先执行原来的逻辑
        this.off(eventName,once)//将这个函数移除掉
    }
    once.l=callback
    this.on(eventName,once)
}

//让对应的函数依次执行
EventEmitter.prototype.emit=function(eventName,...args){
    if(!this._events){
        this._events=Object.create(null)
    }
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => fn(...args))
    }
}

//off
EventEmitter.prototype.off=function(eventName,fn){
    if(this._events[eventName]){
        this._events[eventName]=this._events[eventName].filter(item => item!==fn && item.l!==fn)
    }
}

module.exports=EventEmitter