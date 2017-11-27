#!/usr/bin/env node
const process = require('process');
const path = require('path');
const yargs = require('yargs');
const clean = require('./clean');

// 获取参数
const argv: Object = yargs.options({
  path: {
    alias: 'p',
    demand: false,
    describe: 'Folder directory. (文件夹的目录)',
    type: 'string'
  },
  ext: {
    alias: 'e',
    demand: false,
    describe: 'The extension of the files that needs to be deleted, is segmented by ",". (需要删除的文件的扩展名，以“|”分割)',
    type: 'string'
  },
  file: {
    alias: 'f',
    demand: false,
    describe: 'The name of the files to delete, is segmented by ",". (需要删除的文件名，以“|”分割)',
    type: 'string'
  }
}).argv;


let filePath: string = null;
let extArray: ?string[] = null;
let fileArray: ?string[] = null;

/* 将字符串转化成数组并剔除空字符串 */
function string2Array(str: string): string[]{
  const str2: string[] = str.split(/\s*\|\s*/g);
  for(let i: number = str2.length - 1; i >= 0; i--){
    if(/^\s*$/.test(str2[i])){
      str2.splice(i, 1);
    }
  }
  return str2;
}

// 文件夹路径;
if(argv.path === undefined){
  filePath = path.join(process.cwd(), 'node_modules');
}else{
  if(/^\s*$/.test(argv.path)){
    throw new Error('You must enter the path of a folder. (你必须输入一个文件夹的路径)');
  }else{
    filePath = path.join(argv.path, 'node_modules');
  }
}

// 扩展名
if(argv.ext !== undefined) extArray = string2Array(argv.ext);

// 文件
if(argv.file !== undefined) fileArray = string2Array(argv.file);

clean(filePath, extArray, fileArray);