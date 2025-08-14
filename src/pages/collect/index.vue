<template>
  <div>
    <li v-for="(item,index) in collectListData" :key="index">
      <div class="list-item">
        <p class="list-item-title">{{item.title}}</p>
        <div class="list-item-content">
          <p>作者: {{item.author || item.shareUser}}</p>
          <p>分类: {{item.superChapterName}}/{{item.chapterName}}</p>
        </div>
        <div class="list-item-bottom">
          <p>时间: {{ item.niceDate }}</p>
          <div @click="cancelCollect(item.originId)">
          <img class="collect-img" src="/static/images/collected.png" alt="">
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>

import api from "../../api";
import toast from "../../utils/toast";
import Launch from "../../utils/launch";

export default {
  data(){
    return {
      pageCount: 0,
      collectListData: []
    }
  },

  methods: {
    async collectArticles () {
      const list = await api.collectArticleList(0);
      this.collectListData = list.datas;
      wx.stopPullDownRefresh();
    },

    async loadMore () {
      this.pageCount++
      const list = await api.collectListData(this.pageCount);
      if (list) {
        this.collectListData = [...this.collectListData, ...list.datas];
      } else {
        this.pageCount--
      }
    },

    async cancelCollect (articleId) {
      const res = await api.cancelCollect(articleId);
      if (res) {
        toast.toast("取消收藏成功")
        setTimeout(() => {
          this.collectArticles()
        }, 800)
      } else {
        toast.toast("取消收藏失败")
      }
    },
  },

  //页面创建后进行请求
  onReady() {
    this.collectArticles();
  },

  onReachBottom() {
    this.loadMore();
  },

  onPullDownRefresh() {
    this.collectArticles()
  }
}
</script>

<style scoped>
.list-item {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}
.list-item-title {
  font-size: 16px;
}
.list-item-content {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
}
.list-item-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.collect-img {
  width: 30px;
  height: 30px;
}
</style>
