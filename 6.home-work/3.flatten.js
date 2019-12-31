//数组faltten展平
Array.prototype.myFlat=function(n=1){
    if(n===0) return this
    return this.reduce((a,b)=>{
        if(Array.isArray(b)){
            return a.concat(b.myFlat(--n))
        }else{
            return [...a,b]
        }
    },[])
}
const r=[1,[2,[3,[4,[5]]]]].myFlat(10)
console.log(r)