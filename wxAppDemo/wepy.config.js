const path = require('path')
const fs = require('fs')

var NODE_ENV = process.env.NODE_ENV

console.log('开始调整当前编译配置……')
var file = ''
var fileLessB = ''
if (NODE_ENV === 'production') {// 生产
  file = path.join(__dirname, './src/evnBase_RW/build/evnBase.js')
  fileLessB = path.join(__dirname, './src/evnBase_RW/build/variableBaseUrl.less')
} else if (NODE_ENV === 'buildDev') {// 开发测试
  file = path.join(__dirname, './src/evnBase_RW/buildDev/evnBase.js')
  fileLessB = path.join(__dirname, './src/evnBase_RW/buildDev/variableBaseUrl.less')
} else if (NODE_ENV === 'buildPre') {// 预发布
  file = path.join(__dirname, './src/evnBase_RW/buildPre/evnBase.js')
  fileLessB = path.join(__dirname, './src/evnBase_RW/buildPre/variableBaseUrl.less')
} else if (NODE_ENV === 'dev') {// 开发
  file = path.join(__dirname, './src/evnBase_RW/dev/evnBase.js')
  fileLessB = path.join(__dirname, './src/evnBase_RW/dev/variableBaseUrl.less')
}
// 修改less配置
var toFileLessB = path.join(__dirname, './src/style/variableBaseUrl.less')
fs.writeFileSync(toFileLessB, fs.readFileSync(fileLessB))
// 修改less配置

var to = path.join(__dirname, './src/js/evnBase.js')
fs.writeFileSync(to, fs.readFileSync(file))
console.log('结束调整当前编译配置……')

var prod = (NODE_ENV === 'production' || NODE_ENV === 'buildDev' || NODE_ENV === 'buildPre')

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
