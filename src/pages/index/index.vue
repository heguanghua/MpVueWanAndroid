<template>
  <div>
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="500"
    >
      <swiper-item
        v-for="(item,index) in bannerList" :key="index">
        <img class="banner-img" :src="item.imagePath" @click="onBannerClick(item)">
      </swiper-item>
    </swiper>

    <li v-for="(item,index) in homeListData" :key="index">
      <div class="list-item" @click="onListClick(item, index)">
        <p class="list-item-title">{{item.title}}</p>
        <div class="list-item-content">
          <p>作者: {{item.author || item.shareUser}}</p>
          <p>分类: {{item.superChapterName}}/{{item.chapterName}}</p>
        </div>
        <div class="list-item-bottom">
          <p>时间: {{ item.niceDate }}</p>
          <div>
          <img class="collect-img" v-if="!item.collect" src="/static/images/uncollected.png" alt="">
          <img class="collect-img" v-if="item.collect" src="/static/images/collected.png" alt="">
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>

import api from "../../api";
import toast from "../../utils/toast";
import {tr} from "postcss-mpvue-wxss/lib/wxmlTagMap";
import Launch from "../../utils/launch";

export default {
  data(){
    return {
      pageCount: 0,
      bannerList: [],
      homeListData: []
    }
  },

  methods: {
    async homeBanner () {
      this.bannerList = await api.homeBanner();
      console.log("bannerList: ", this.bannerList);
    },
    async homeArticles () {
      const list = await api.homeArticles(0);
      this.homeListData = list.datas;
      wx.stopPullDownRefresh();
    },

    async loadMore () {
      this.pageCount++
      const list = await api.homeArticles(this.pageCount);
      if (list) {
        this.homeListData = [...this.homeListData, ...list.datas];
      } else {
        this.pageCount--
      }
    },

    async collect (articleId, index) {
      const res = await api.collect(articleId);
      if (res) {
        this.homeListData[index].collect = true
        toast.toast("收藏成功")
      } else {
        toast.toast("收藏失败")
      }
    },

    async cancelCollect (articleId, index) {
      const res = await api.cancelCollect(articleId);
      if (res) {
        this.homeListData[index].collect = false
        toast.toast("取消收藏成功")
      } else {
        toast.toast("取消收藏失败")
      }
    },

    clickCollect(isCollect, articleId, index) {
      if (isCollect === true) {
        this.cancelCollect(articleId, index);
      } else {
        this.collect(articleId, index);
      }
    },

    onBannerClick(item) {
      console.log(item.url);
    },

    onListClick(item, index) {
      console.log(item.title);
      wx.showActionSheet({
        itemList: [item.collect === true ? "取消收藏": "收藏文章", "进入详情"],
        success: (res) => {
          console.log("onListClick", res.tapIndex, item.link);
          if (res.tapIndex === 0) {
            this.clickCollect(item.collect, item.id, index);
          } else {
            Launch.navigateTo("/pages/webview/main", {"url": item.link});
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  },

  //页面创建后进行请求
  onReady() {
    this.homeBanner();
    this.homeArticles();
  },

  onReachBottom() {
    this.loadMore();
  },

  onPullDownRefresh() {
    this.homeArticles()
  }
}
</script>

<style scoped>
.swiper {
  height: 200px;
}
.banner-img {
  width: 100%;
  height: 200px;
}
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
