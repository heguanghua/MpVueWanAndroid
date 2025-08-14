function toast(title, duration = 1500) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: duration
  })
}

function loading(content="loading...") {
  wx.showLoading({
    title: content,
  })
}

function hideLoading() {
  wx.hideLoading()
}

function showDialog(title, content) {
  wx.showModal({
    title: title,
    content: content,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

export default {
  toast, loading, hideLoading, showDialog
}
