/***
 * promise的链式调用（如果是一个Promise就不是普通值）
 * 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then的失败回调
 * 如果then方法返回了一个失败的promise他会走外层then的失败的回调
 * 
 */