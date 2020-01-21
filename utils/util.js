import { cityInfo } from 'region.js'
import { isHasNetwork } from 'netUtils.js'

const toast = function(title, icon="none", duration=1500) {
  if (title) {
    wx.showToast({
      title: title,
      duration: duration,
      icon: icon,
      mask: true
    })
  }
}

const showLoading = function (title='加载中...') {
  wx.showLoading({
    title: title,
    mask: true
  })
}

const hideLoading = function () {
  wx.hideLoading()
}

/**
 * 地址匹配 
**/
const addressMate = function (listData) {
  listData.map((address) => {
    address.allAddress = ''
    cityInfo.map((item) => {
      if (address.province_id == item.value) {
        address.allAddress += item.label
        item.children.map((city) => {
          if (address.city_id == city.value) {
            address.allAddress += city.label
            city.children.map((county) => {
              if (address.county_id == county.value) {
                address.allAddress += county.label
              }
            })
          }
        })
      }
    })
  })
  return listData
}

/**
 * 获取窗口高度
 */
const getWindowHeight = function () {
  return wx.getSystemInfoSync()['windowHeight']
}

/**
 * 初始化（设置网络状态、高度）
 */
const init = function (onSuccess) {
  isHasNetwork((isHasNetwork) => {
    onSuccess(isHasNetwork, getWindowHeight())
  })
}

module.exports = {
  toast,
  addressMate,
  showLoading,
  hideLoading,
  init
}
