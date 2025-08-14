/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param path
 */
function switchTab(path) {
  wx.switchTab({
    url: path
  })
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param path
 * @param params
 */
function reLaunch(path, params = {}) {
  const fullUrl = generateUrl(path, params);
  console.log(`reLaunch: ${fullUrl}`);
  wx.reLaunch({
    url: fullUrl,
  })
}

/**
 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
 * @param path
 */
function redirectTo(path) {
  const fullUrl = generateUrl(path, params);
  wx.redirectTo({
    url: fullUrl,
  })
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层
 * @param path
 * @param params
 * @param callbackEvent
 * @param success
 */
function navigateTo(path, params = {}, callbackEvent = {}, success = (res) => {}) {
  const fullUrl = generateUrl(path, params);
  wx.navigateTo({
    url: fullUrl,
    events: callbackEvent,
    success: success,
  })
}

/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层
 * @param dalta
 */
function navigateBack(dalta = 1) {
  wx.navigateBack({
    delta: dalta,
  })
}


function generateUrl(path, params = {}) {
  const url = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
  return url ? `${path}?${url}` : path
}

export default {
  switchTab, reLaunch, redirectTo, navigateTo, navigateBack
}
