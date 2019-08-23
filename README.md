# egret-fast-debug README

## Fast Debug for Egret engine

## install

    直接在vscode的插件商店中搜索"egret fast debug"安装

    或本地安装:cmd+shift+p 选择使用vsix安装

## introduce

    此插件将在vscode中,打开白鹭项目的ts文件时被激活,开始监听ts文件更改
    
    当修改脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录
    
    当新增脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录,同时将在manifest.json中新增对应字段

    当删除脚本时,将删除bin-debug对应目录的js以及js.map,同时将在manifest.json中删除对应字段

## Features

   use vscode fileWatcher to watch .ts file if changed

   使用vscode监测工作区白鹭项目的ts文件改动

## Dependencies

    nodejs,typescript

    To confirm your node and typescript version,use "node -v" and "tsc -v".

    确保环境中已安装node,typescript
    
    --add:0.0.2版本内置typescript依赖,无需单独安装了

### 0.0.1

Init tool

初始化

### 0.0.2

Add a necessary dependency into the package

添加了一个必要依赖至包体中

### 0.0.3

support egret wing3

支持egret wing3编辑器
