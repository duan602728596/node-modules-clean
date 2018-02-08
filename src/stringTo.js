/* 将字符串转化成数组、剔除空字符串、全部转换成小写 */

/* 处理file */
function string2File(str: string): string[]{
  const splitStr: string[] = str.split(/\s*\|\s*/g);
  const arr: string[] = [];
  for(let i: number = splitStr.length - 1; i >= 0; i--){
    const item: string = splitStr[i];
    if(!/^\s*$/.test(item)){
      arr.push(item.toLocaleLowerCase());
    }
  }
  return arr;
}

/* 处理ext */
function string2Ext(str: string): string[]{
  const splitStr: string[] = str.split(/\s*\|\s*/g);
  const arr: string[] = [];
  for(let i: number = splitStr.length - 1; i >= 0; i--){
    const item: string = splitStr[i];
    if(!/^\s*$/.test(item)){
      // 判断是*.ext 或是 .ext，并全部转换成.ext格式
      if(/^\*\..*$/){
        arr.push(item.toLocaleLowerCase());
      }else{
        arr.push(item.match(/\..*/)[0].toLocaleLowerCase());
      }
    }
  }
  return arr;
}

module.exports = {
  string2File,
  string2Ext
};