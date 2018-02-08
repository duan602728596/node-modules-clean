/* 解析fileList */
const fs = require('fs');

/* 读取文件 */
function readFL(filelist: string): Promise{
  return new Promise((resolve: Function, reject: Function): void=>{
    fs.readFile(filelist, {
      encoding: 'utf8'
    }, (err: Error, data: string): void=>{
      if(err){
        throw new Error(err);
      }
      resolve(data);
    });
  });
}

/* 解析文件 */
function parse(data: string): { file: string[], ext: string[] }{
  const splitData: string[] = data.split('\n');
  const file: string[] = [];
  const ext: string[] = [];
  // 循环，逐行判断
  splitData.map((item: Object, index: number): void=>{
    // 判断是否是注释"#"或者空行
    if(/^\s*(#.*)?\s*$/.test(item)){
      return void 0;
    }
    // 去掉前后空行
    const itemFormat: string = item.replace(/^\s+/, '').replace(/\s+#.*\s+$/, '');
    // 判断是否是扩展名
    if(/^\s*\*\..*$/.test(itemFormat)){
      ext.push(itemFormat.match(/\..*/)[0].toLocaleLowerCase());
      return void 0;
    }else{
      // 作为文件来判断
      file.push(itemFormat.toLocaleLowerCase());
    }
  });
  return {
    file,
    ext
  };
}

async function parseFileList(filelist: string): Promise<{ file: string[], ext: string[] }>{
  const data: string = await readFL(filelist);
  return parse(data);
}

module.exports = parseFileList;