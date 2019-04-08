const path = require('path')
const axios = require('axios')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 项目的主要配置文件
module.exports = {
  // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  devServer: {
    before: app => {
      app.get('/api/getDiscList', function(req, res) {
        const url =
          'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios
          .get(url, {
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(e => {
            console.log(e)
          })
      })
    }
  },
  chainWebpack: config => {
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
  }
}
