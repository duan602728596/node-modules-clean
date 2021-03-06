const path = require('path');
const fs = require('fs');
const retain = require('./retain');

let extArray: string[] = retain.ext;
let fileArray: string[] = retain.file;

/* 列举文件夹内的文件 */
function fileList(filePath: string): Promise{
  return new Promise((resolve: Function, reject: Function): void=>{
    fs.readdir(filePath, (err: Error, files: string[]): void=>{
      if(err){
        reject(err);
      }else{
        resolve(files);
      }
    });
  }).catch((err: Error): void=>{
    console.error(err);
  });
}

/* 判断是文件还是文件夹 */
function isFile(filePath: string): Promise{
  return new Promise((resolve: Function, reject: Function): void=>{
    fs.stat(filePath, (err: Error, stats: any)=>{
      if(err){
        reject(err);
      }else{
        resolve(stats);
      }
    });
  }).catch((err: Error): void=>{
    console.error(err);
  });
}

/* 删除 */
function goToDelete(filePath: string, fileInfor: Object): void{
  fs.unlink(filePath, (err: Error): void=>{
    if(err){
      console.error(err);
    }else{
      console.log('DELETE: ' + fileInfor.dir + '\\' + fileInfor.base);
    }
  });
}

// 清除文件
function deleteFile(filePath: string): void{
  const fileInfor: Object = path.parse(filePath);
  const ext = fileInfor.ext.toLocaleLowerCase();
  const base = fileInfor.base.toLocaleLowerCase();

  if(extArray.includes(ext)){          // 根据扩展名匹配
    goToDelete(filePath, fileInfor)
  }else if(fileArray.includes(base)){  // 根据文件名匹配
    goToDelete(filePath, fileInfor);
  }
}

/* 清除文件夹 */
async function cleanFilder(nodeModulesPath: string): Promise<void>{
  const list: string[] = await fileList(nodeModulesPath);
  for(let i: number = 0, j: number = list.length; i < j; i++){
    const pf: string = path.join(nodeModulesPath, list[i]);
    const stats: any = await isFile(pf);
    if(stats.isFile()){
      deleteFile(pf);
    }else{
      cleanFilder(pf);
    }
  }
}

function clean(nodeModulesPath: string, _extArray: ?string[], _fileArray: ?string): void{
  // 合并删除名单
  if(_extArray){
    extArray = extArray.concat(_extArray);
  }
  if(_fileArray){
    fileArray = fileArray.concat(_fileArray);
  }

  cleanFilder(nodeModulesPath);
}

module.exports = clean;