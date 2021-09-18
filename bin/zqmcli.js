#!/usr/bin/env node
'use strict';
const { green } = require('../chalk');
var program = require('commander');
 
/* zqmcli create 创建项目 */
program.command('create').description('create a project').action(function() {
    green('欢迎使用zqmcli, 轻松构建ts项目')
})

/* zqmcli start 运行项目 */
program.command('start').description('start a project').action(function(){
    green('-----运行项目-----')
})

/* zqmcli build 打包项目 */
program.command('build').description('build a project').action(function(){
    green('-----构建项目-----')
})

program.parse(process.argv)