//react中的事务处理也是AOP
class Transcation {
    perform(anyMethod,wappers) {
        wappers.forEach(wapper => wapper.initialize())
        anyMethod()
        wappers.forEach(wapper => wapper.close())
    }
}

let t = new Transcation()
t.perform(() => {
    console.log('处理的事情')
}, [
    {
        initialize: () => {
            console.log('初始化1')
        },
        close: () => {
            console.log('关闭1')
        }
    },
    {
        initialize: () => {
            console.log('初始化2')
        },
        close: () => {
            console.log('关闭2')
        }
    }
]) 