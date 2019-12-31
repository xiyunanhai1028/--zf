//Promise.try
function fn(){
    // throw Error('error 123')
    return new Promise((resolve,reject)=>{
        reject('error 123')
    })
}

Promise.try=function(fn){
    return new Promise((resolve,reject)=>{
        resolve(fn())
    })
}
Promise.try(fn).catch(err => console.log(err))