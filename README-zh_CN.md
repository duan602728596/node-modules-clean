# node-modules-clean

## 说明
清除`node_modules`文件夹内的冗余文件。   
目前清除的文件包括`license`、`.npmignore`、`package-lock.json`、`yarn.lock`、`.yarn-integrity`、`.gitignore`文件，`.md`、`.txt`类型文件。

## 安装
```
$ npm install node-modules-clean -g
```

## 使用
进入文件夹，运行
```
$ node-modules-clean
```
清除当前目录内的`node_modules`文件夹内的冗余文件。

参数`--path`或者`-p`，选择一个文件夹目录。
```
$ node-modules-clean --path "path/to"
```
或
```
$ node-modules-clean -p "path/to"
```

参数`--ext`或者`-e`，添加需要清除的文件的扩展名，参数以“|”分割。
```
$ node-modules-clean --ext "*.ts | *.less"
```

参数`--file`或者`-f`，添加需要清除的文件名，参数以“|”分割。
```
$ node-modules-clean --file "a.js | b.js"
```

参数`--filelist`或者`-i`，选择一个清除的文件清单。
```
$ node-modules-clean --filelist "clean.txt"
```
清单格式如下
```
# 注释
*.ts        # 清除*.ts文件
test.js     # 清除test.js文件
```

## 参数
| 命令 | 作用 |
| ---  | ---  |
| --path(-p)     | 选择一个文件夹目录                             |
| --ext(-e)      | 添加需要清除的文件的扩展名，参数以“&#124;”分割 |
| --file(-f)     | 添加需要清除的文件名，参数以“&#124;”分割       |
| --filelist(-i) | 清除的文件清单（枪毙名单）                     |
