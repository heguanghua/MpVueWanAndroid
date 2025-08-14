import {flyGet, flyPost} from "../utils/http";

/**
 * 首页banner
 * @returns {*}
 */
function homeBanner() {
  return flyGet("banner/json")
}

/**
 * 首页分页文章列表
 * @param pageCount
 * @returns {*}
 */
function homeArticles(pageCount) {
  return flyGet(`article/list/${pageCount}/json`)
}


/**
 * 鸿蒙数据
 * @param pageCount
 * @returns {*}
 */
function harmonyData() {
  return flyGet(`harmony/index/json`)
}

/**
 * 搜索数据
 * @param keyWord
 * @param pageCount
 * @returns {*}
 */
function search(keyWord, pageCount = 0) {
  return flyPost(`article/query/${pageCount}/json`, {"k": keyWord}, true)
}

/**
 * 登录
 * @param userName
 * @param password
 * @returns {*}
 */
function login(userName, password) {
  return flyPost(`user/login`, {"username": userName, "password": password}, true)
}

/**
 * 注册
 * @param userName
 * @param password
 * @returns {*}
 */
function register(userName, password, repassword) {
  return flyPost(`user/register`, {"username": userName, "password": password, "repassword": repassword}, true)
}

/**
 * 收藏站内文章
 * @param articleId
 * @returns {*}
 */
function collect(articleId) {
  return flyPost(`lg/collect/${articleId}/json`, null)
}

/**
 * 取消收藏
 * @param articleId
 * @returns {*}
 */
function cancelCollect(articleId) {
  return flyPost(`lg/uncollect_originId/${articleId}/json`, null)
}

/**
 * 收藏文章列表
 * @param pathId
 * @returns {*}
 */
function collectArticleList(pathId) {
  return flyGet(`lg/collect/list/${pathId}/json`, null)
}

/**
 * 项目分类
 * @returns {*}
 */
function getProjectType() {
  return flyGet(`project/tree/json`)
}

/**
 * 项目列表数据
 * @returns {*}
 */
function getProjectList(cid, pageCount = 1) {
  return flyGet(`project/list/${pageCount}/json`, {cid: cid})
}


export default {
  homeBanner, homeArticles, harmonyData, search, login, register, collect, cancelCollect, collectArticleList, getProjectType, getProjectList
}
