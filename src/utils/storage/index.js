function saveSync(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) { }
}

function save(key, value) {
  wx.setStorage({
    key:key,
    data:value
  })
}

function getSync(key) {
  return wx.getStorageSync(key)
}

function remove(key) {
  wx.removeStorageSync(key)
}

function clear() {
  try {
    const data = wx.getStorageInfoSync()
    for (let key in data.keys) {
      remove(key)
    }
  } catch (e) {

  }
}

export default {
  save, saveSync, getSync, remove, clear
}
