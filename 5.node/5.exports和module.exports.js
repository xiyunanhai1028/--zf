console.log(exports===module.exports)//=>true

/**
 * exports='hello'和module.exports='hello'的区别
 * 因为 exports=module.exports={},return的时候饭后的是module.exports
 * 所以 exports='hello'后，return 还是原来的module.exports，所以会为{}
 * 而module.exports='hello',return返回的是module.exports，所以为hello
 */

 //如果要赋值
 exports.xxx='xxx'
 module.exports='xxx'
 module.exports.xxx='xxx'