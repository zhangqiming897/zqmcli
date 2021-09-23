const { yellow, green, blue } = require("chalk");
const fs = require('fs');
const npm = require('../src/npm');

let fileCount = 0; /* 文件数量 */
let dirCount = 0; /* 文件夹数量 */
let flat = 0; /* readir数量 */

/**
 * 
 * @param {*} sourcePath  // template资源路径
 * @param {*} currentPath  // 当前项目路径
 * @param {*} cb // 项目复制完成回调函数
 */

const copy = (sourcePath, currentPath, cb) => {
    flat++;
    /* 读取文件夹下面文件 */
    fs.readdir(sourcePath,(err,paths)=>{
        flat--
        if(err) throw err
        paths.forEach(path=>{
            if(path !== '.git' && path !== 'package.json') fileCount++
            const newSourcePath = sourcePath + '/'+path
            const newCurrentPath = currentPath + '/' + path
            /* 判断文件信息 */
            fs.stat(newSourcePath,(err,stat)=>{
                if(err) throw err
                /* 判断是文件, 且不是package.json */
                if(stat.isFile() && path !== 'package.json') {
                    /* 创建读写流 */
                    const readSteam = fs.createReadStream(newSourcePath);
                    const wirteSteam = fs.createWriteStream(newCurrentPath);
                    readSteam.pipe(wirteSteam);
                    fileCount--;
                    completeControl(cb)
                    /* 判断文件夹,对文件夹单独进行dirExist操作 */
                }else if(stat.isDirectory()){
                    if(path!=='.git' && path !== 'package.json'){
                        dirCount++
                        dirExist(newSourcePath, newCurrentPath, copy, cb)
                    }
                }
            })
        })
    })
}

/**
 * 
 * @param {*} sourcePath  // template资源路径
 * @param {*} currentPath  // 当前项目路径
 * @param {*} copyCallback  // 上面的copy函数
 * @param {*} cb // 项目复制完成回调函数
 */

const dirExist = (sourcePath, currentPath, copyCallback,cb) => {
    fs.exists(currentPath,(ext=>{
        if(ext){
            /* 递归调用copy函数 */
            copyCallback(sourcePath, currentPath, cb)
        }else{
            fs.mkdir(currentPath,()=>{
                fileCount--
                dirCount--
                copyCallback(sourcePath, currentPath, cb)
                yellow('创建文件夹:'+currentPath)
                completeControl(cb)
            })
        }
    }))
}

const completeControl = (cb) => {
    /* 三变量均为0, 异步I/O执行完毕 */
    if(fileCount === 0 && dirCount === 0 && flat ===0) {
        green('-----构建完成-----')
        if(cb && !isInstall){
            isInstall = true
            blue('-----开始install-----')
            cb(()=>{
                blue('-----完成install-----')
                /*判断是否存在webpack */
                runProject()
            })
        }
    } 
}

const runProject = () => {
    try {
       /* 继续调用 npm 执行，npm start 命令 */
        const start = npm([ 'start' ])
        start()
    }catch(e){
        red('自动启动失败，请手动npm start 启动项目')
    }
}

module.exports = copy;