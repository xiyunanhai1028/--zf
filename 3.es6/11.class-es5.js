//实例属性 公共属性
function Animal(){
    this.type='哺乳类'
}

Animal.prototype.eat=function(){
    console.log('吃饭')
}

function Tiger(){
    Animal.call(this)
}

// let tiger=new Tiger()
// tiger.eat()//=>tiger.eat is not a function
// console.log(tiger.type)//=>哺乳类

// Tiger.prototype.__proto__=Animal.prototype
// let tiger=new Tiger()
// tiger.eat()//=>吃饭

//es6写法
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype)
// let tiger=new Tiger()
// tiger.eat()//=>吃饭

//Object.create()
// function create(Ppoto){
//     let Fn=function(){}
//     Fn.prototype=Ppoto
//     return new Fn()
// }
// Tiger.prototype=create(Animal.prototype)
// let tiger=new Tiger()
// tiger.eat()//=>吃饭
// console.log(tiger.construct)//=>undefined

Tiger.prototype=Object.create(Animal.prototype,{constructor:{value:Tiger}})
let tiger=new Tiger()
tiger.eat()//=>吃饭
console.log(tiger.constructor)//=>[Function: Tiger]
