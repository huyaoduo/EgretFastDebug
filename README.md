# egret-fast-debug README

## Fast Debug for Egret engine

此插件将在vscode中,打开白鹭项目的ts文件时被激活,开始监听ts文件更改
    
    当修改脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录
    
    当新增脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录,同时将在manifest.json中新增对应字段

    当删除脚本时,将删除bin-debug对应目录的js以及js.map,同时将在manifest.json中删除对应字段

## Features

   use vscode fileWatcher to watch .ts file if changed

## Requirements

    dependences:nodejs,tsc

### 1.0.0

Init tool
