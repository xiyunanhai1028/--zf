//es5 构造函数 模拟类 函数名字大写
function Animal(){
    this.type='哺乳类'
    this.a={}
}
//静态方法
Animal.b=function(){
    console.log('我是静态方法')
}

//公共方法
Animal.prototype.home=function(){}

/***
 * 类的实例
 * 私有属性，是外面拿不到的
 * 1.实例上的属性
 * 2.公共属性
 * 3.静态方法 静态属性 只能通过类来调用
 */
let animal1=new Animal()
let animal2=new Animal()

console.log(animal1===animal2)//=>false
//静态方法 静态属性 只能通过类来调用
// animal2.b()//=>animal2.b is not a function

//每个对象上都会有一个__proto__ 找所属类的原型prototype, __proto__=x.prototype
console.log(animal1.__proto__===Animal.prototype)//=>true

//构造函数原型上的__proto__
console.log(Animal.prototype.__proto__===Object.prototype)//=>true

//Object原型上的__proto__
console.log(Object.prototype.__proto__)//=>null

console.log(Object.__proto__===Function.prototype)//=>true
console.log(Function.__proto__===Function.prototype)//=>true
console.log(Object.__proto__===Function.__proto__)//=>true

//constructor
console.log(Animal.prototype.constructor===Animal)//=>true
console.log(animal1.constructor)//获取的是类，无法拿到类实例的属性 可以拿到静态属性或方法

