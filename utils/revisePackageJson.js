const { green } = require("chalk");
const fs = require('fs');

const revisePackageJson = (res, sourcePath) => {
   return new Promise((resolve)=>{
       /* 读取文件 */
       fs.readFile(sourcePath+'/package.json',(err, data)=>{
           if(err) throw err
           const { author, name } = res;
           let json = data.toString();
           /* 替换模板 */
           json = json.replace(/demoName/g, name.trim())
           json = json.replace(/demoAuthor/g, author.trim())
           const path = process.cwd() + '/package.json'
           /* 写入文件 */
           fs.writeFile(path, new Buffer.from(json), ()=>{
               green('创建文件:'+path)
               resolve();
           })
       })
   })
}

module.exports = revisePackageJson;