//公共的方法

//防抖动方法:func函数名称，delay需要等多久
export function debounce(func, delay){
  let timer = null
  return function (...args) {
    //判断timer有没有值，如果有值清除掉
    if (timer) clearTimeout(timer)
    //setTimeout异步，下次
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}