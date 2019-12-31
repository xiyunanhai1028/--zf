//new 的原理
function Animal(){
    this.a=1
}

Animal.prototype.say=function(){
    console.log('说话')
}

function mockNew(constr){
    let obj={}
    obj.__proto__=Animal.prototype//继承公共属性
    let r=constr.call(obj)//可能返回一个结果
    return typeof r==='object' ? r : obj
}

const mock=new mockNew(Animal)
console.log(mock.a,mock.say)