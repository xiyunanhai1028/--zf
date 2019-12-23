//lodash after在执行多少此后执行
function after(times,func){
    return ()=>{
        times--
        if(times===0){
            func()
        }
    }
}

let afterFunc=after(3,()=>{
    console.log('执行三次之后执行')
})

afterFunc()
afterFunc()
afterFunc()
