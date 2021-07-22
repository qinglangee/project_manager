# 项目结构

## 代码结构
1. index.js 是程序入口，初始化基本配置。
    初始加载 project_list.html, 然后每个页面包含 header.html 负责页面跳转。 
1. server/config.js 保存配置信息。 文件的存储位置之类的
1. server/data_manager.js  负责处理数据， 与数据相关的都写在这里， 便于管理 。  
1. bean 目录存放表示实例的类


## 用到的模块
后台主要看 package.json 就行，
前台也要看一下 lib, 有些是直接加载进去的, 主要是 bootstrap vue, 其它用到什么功能再往里加。