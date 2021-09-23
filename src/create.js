const { green, blue } = require('../utils/chalk');
const revisePackageJson = require('../utils/revisePackageJson');
const copy = require('../utils/copy');
const npm = require('./npm');

module.exports = (res) => {
     /* 创建文件 */
    green('-----开始创建-----')
    /* 找到template文件夹下的模板项目 */
    const sourcePath = __dirname.slice(0, -3) + 'template'
    blue('当前路径:'+process.cwd())
    /* 修改package.json */
    revisePackageJson(res, sourcePath).then(()=>{
        copy(sourcePath, process.cwd(), npm())
    })
}