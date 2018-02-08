#!/usr/bin/env node
const process = require('process');
const path = require('path');
const yargs = require('yargs');
const clean = require('./clean');
const { string2File, string2Ext } = require('./stringTo');
const parseFileList = require('./parseFileList');

/* 获取参数 */
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
    describe: 'The extension of the files that needs to be deleted, is segmented by "|". (需要删除的文件的扩展名，以“|”分割)',
    type: 'string'
  },
  file: {
    alias: 'f',
    demand: false,
    describe: 'The name of the files to delete, is segmented by "|". (需要删除的文件名，以“|”分割)',
    type: 'string'
  },
  filelist: {
    alias: 'i',
    demand: false,
    describe: 'Need to delete files and extensions list of files. (需要删除的文件和扩展名的列表文件)',
    type: 'string'
  }
}).argv;

let pathFile: ?string = null;             // 文件夹地址
let nodeModulesPath: ?string = null;      // node_modules文件夹地址
let fileList: ?string = null;             // 需要删除的文件和扩展名的列表文件
let extArray: string[] = [];              // 需要删除的扩展名数组
let fileArray: string[] = [];             // 需要删除的文件数组

// 文件夹路径
if(argv.path === undefined){
  pathFile = process.cwd();
}else{
  if(/^\s*$/.test(argv.path)){
    throw new Error('You must enter the path of a folder. (你必须输入一个文件夹的路径)');
  }else{
    pathFile = argv.path;
  }
}
nodeModulesPath = path.join(pathFile, 'node_modules');

// filelist
if(argv.filelist !== undefined){
  fileList = argv.filelist;
  if(!path.isAbsolute(argv.filelist)){
    fileList = path.join(pathFile, argv.filelist);
  }
}

// 扩展名数组
if(argv.ext !== undefined){
  extArray = string2Ext(argv.ext);
}

// 文件数组
if(argv.file !== undefined){
  fileArray = string2File(argv.file);
}

async function start(): Promise<void>{
  // 解析filelist
  if(fileList !== null){
    const { file, ext }: {
      file: string[],
      ext: string[]
    } = await parseFileList(fileList);

    console.log(file, ext);

    extArray = extArray.concat(ext);
    fileArray = fileArray.concat(file);
  }
  clean(nodeModulesPath, extArray, fileArray);
}
start();