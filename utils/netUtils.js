//网络相关处理工具

const isHasNetwork = function (onSuccess) {
  wx.getNetworkType({
    success: function (res) {
      onSuccess(res.networkType !== 'none')
    }
  })
}

module.exports = {
  isHasNetwork
}