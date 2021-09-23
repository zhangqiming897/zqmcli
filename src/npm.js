const which = require('which')
/* 找到npm */
const findNpm = () => {
    let npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm']
    for(let i = 0; i < npms.length; i++){
        try {
            which.sync(npms[i])
            return npms[i]
        } catch (e) {

        }
    }
    throw new Error('please install npm')
}
/* 运行终端命令 */
/**
 * 
 * @param {*} cmd 
 * @param {*} args 
 * @param {*} fn 
 */
const runCmd = (cmd, args, fn) => {
   args = args || []
   let runner = require('child_process').spawn(cmd, args, {
       stdio: 'inherit'
   })
   runner.on('close', function(code){
       if(fn){
           fn(code)
       }
   })
}

module.exports = (installArg=['install']) => {
   /* 闭包保存npm */
   const npm = findNpm()
   return (done) => {
       /* 执行命令 */
       runCmd(which.sync(npm), installArg, ()=>{
           /* 执行回调 */
           done && done()
       })
   }
}