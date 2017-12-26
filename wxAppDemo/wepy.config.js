const path = require('path')
const fs = require('fs')

var prod = process.env.NODE_ENV === 'production'
var NODE_ENV = process.env.NODE_ENV

console.log('开始调整当前编译配置……')
var file = ''
if (NODE_ENV === 'production') {// 生产
  file = path.join(__dirname, './src/evnBase_RW/build/evnBase.js')
} else if (NODE_ENV === 'buildDev') {// 开发测试
  file = path.join(__dirname, './src/evnBase_RW/buildDev/evnBase.js')
} else if (NODE_ENV === 'buildPro') {// 预发布
  file = path.join(__dirname, './src/evnBase_RW/buildPro/evnBase.js')
} else if (NODE_ENV === 'dev') {// 开发
  file = path.join(__dirname, './src/evnBase_RW/dev/evnBase.js')
}
var to = path.join(__dirname, './src/js/evnBase.js')
fs.writeFileSync(to, fs.readFileSync(file))
console.log('结束调整当前编译配置……')

var prod = (NODE_ENV === 'production' || NODE_ENV === 'buildDev' || NODE_ENV === 'buildPro')

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
        // 压缩过滤console.log()
        compress: {
          drop_console: true
        }
      }
    }
  }
}
