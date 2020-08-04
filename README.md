# egret-fast-debug README

## Fast Debug for Egret engine

## Install

    直接在vscode的插件商店中搜索"egret fast debug"安装

    或本地安装:cmd+shift+p 选择使用vsix安装

## Introduce

    此插件将在vscode中,打开白鹭项目的ts文件时被激活,开始监听ts文件更改
    
    当修改脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录
    
    当新增脚本时,将自动编译ts代码至js以及对应js.map,并放入bin-debug对应目录,同时将在manifest.json中新增对应字段

    当删除脚本时,将删除bin-debug对应目录的js以及js.map,同时将在manifest.json中删除对应字段

## Features

    Use vscode's fileWatcher to watch .ts files if changed

    使用vscode监测工作区白鹭项目的ts文件改动

## Dependencies

    Confirm your node and typescript version,use "node -v" and "tsc -v".

    确保环境中已安装node
    0.0.2版本内置typescript依赖,无需单独安装了

## History
### 1.0.0
    新增依赖，正式版1.0.0发布
### 0.0.6
    代码优化
### 0.0.5
    从打开ts激活插件改为项目中有egretProperties.json激活插件
### 0.0.5

    新增使用任务队列进行处理文件,多个文件同时变动将不会导致manifest.json出错了

### 0.0.4

    在egret wing中,移除了弹框提示,改为输出提示
    现在提示中会包括具体文件名

### 0.0.3

    Support egret wing3
    支持egret wing3编辑器

### 0.0.2

    Add a necessary dependency into this package
    添加了一个必要依赖至包体中

### 0.0.1

    Init tool
    初始化
