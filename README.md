# node-modules-clean

[中文文档](README-zh_CN.md)

## Explain
Clear the redundant files in the `node_modules` folder.   
Currently cleared files include `license`, `.npmignore`, `package-lock.json`, `yarn.lock`, `.yarn-integrity`, `.gitignore` files, `.md`, `.txt` type files.

## Install
```
$ npm install node-modules-clean -g 
```

## Use
Enter folder, run
```
$ node-modules-clean
```
Clear the redundant files in the `node_modules` folder in the current directory.

Parameter `--path` or `-p`, select a folder directory.
```
$ node-modules-clean --path "path/to"
```
or
```
$ node-modules-clean -p "path/to"
```

The parameters of `--ext` or `-e`, add the extension files you need to remove the parameter "|" segmentation.
```
$ node-modules-clean --ext ".ts | .less"
```

The parameters of `--file` or `-f`, add the need to remove the file name, "|" segmentation parameters.
```
$ node-modules-clean --file "a.js | b.js"
```

## Parameter
| command | effect |
| ---     | ---    |
| --path(-p) | Select a folder directory.                                                      |
| --ext(-e)  | Add the extension files you need to remove the parameter "&#124;" segmentation. |
| --file(-f) | Add the need to remove the file name, "&#124;" segmentation parameters.         |