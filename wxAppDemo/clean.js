'use strict'
var path = require('path')
var fs = require('fs')

function deleteall(path) {
  var files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        deleteall(curPath)
      } else {
        console.log('清除;' + curPath)
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

console.log('开始清除style')
var stylePath = path.join(__dirname, './dist/style')
deleteall(stylePath)
console.log('结束清除style')
console.log('开始清除evnBase_Rw')
var evnBasePath = path.join(__dirname, './dist/evnBase_RW')
deleteall(evnBasePath)
console.log('结束清除evnBase_Rw')
