//mixin
//洋葱模型
let minxin=(superClass)=>{
    return class extends superClass{
        beforeCreate(){
            super.beforeCreate()
            console.log('mixin beforeCreate')
        }
    }
}
class Parent{
    beforeCreate() {
        console.log('parent beforeCreate')
    }
}

class Child extends minxin(Parent){
    beforeCreate() {
        super.beforeCreate()
        console.log('child beforeCreate')
    }
}

const child=new Child()
child.beforeCreate()