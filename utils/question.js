const question = [
    {
        name: 'conf',
        type: 'confirm',
        message: '是否创建新项目?'
    },
    {
        name: 'name',
        message: '请输入项目名称?',
        when: res => Boolean(res.conf)
    },
    {
        name: 'author',
        message: '请输入作者?',
        when: res => Boolean(res.conf)
    },
    {
        type: 'list',
        message: '请选择公共管理状态?',
        name: 'state',
        choices: ['mobx', 'redux'],
        filter: (val) => {
          return val.toLowerCase()
        },
        when: res => Boolean(res.conf)
    }
]

module.exports = {
    question
}