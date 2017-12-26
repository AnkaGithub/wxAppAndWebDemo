import wepy from 'wepy'
import 'wepy-async-function'

console.log(121)

module.exports = {
  // 模拟睡眠
  sleep(s = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(s)
      }, s * 1000)
    })
  },
  // type=0，失败，type=1，成功，默认1
  showToast(title, type = 1) {
    var param = {
      title: title,
      icon: 'success',
      mask: true,
      duration: 3000
    }
    if (type == 0) {
      param.image = '../assets/images/err.png'
    }
    wx.showToast(param)
    setTimeout(() => {
      wx.hideToast()
    }, 3200)
  },
  // 页面加载中
  showLoading(title = '加载中') {
    wx.showLoading({
      title: title,
      mask: true
    })
  },
  // 获取基本就信息(同步)
  getUserInfo() {
    let that = this
    return new Promise((resolve, reject) => {
      wepy.getUserInfo({
        success(res) {
          resolve(res)
        },
        fail(res) {
          (async () => {
            await util.sleep()
            let r = await that.getUserInfo()
            resolve(r)
          })()
        }
      })
    })
  }
}
