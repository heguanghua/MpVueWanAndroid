<template>
  <div>
    <div class="title">
      鸿蒙常用开源库
    </div>
    <li v-for="(item,index) in sourceList" :key="index">
      <div class="list-item" @click="itemClick(item.link)">
        <p> {{item.title}} </p>
        <div class="list-item-content">
          <p>作者：{{item.author}}</p>
          <p>分类：{{item.chapterName}}</p>
        </div>
        <p>时间: {{item.niceDate}}</p>
      </div>
    </li>

    <div class="title">
      鸿蒙常用链接
    </div>
    <li v-for="(item,index) in linkList" :key="index">
      <div class="list-item" @click="itemClick(item.link)">
        <p> {{ item.title }} </p>
        <div class="list-item-content">
          <p>作者：{{ item.author }}</p>
          <p>分类：{{ item.chapterName }}</p>
        </div>
        <p>时间: {{ item.niceDate }}</p>
      </div>
    </li>

    <div class="title">
      鸿蒙常用工具
    </div>
    <li v-for="(item,index) in toolList" :key="index">
      <div class="list-item" @click="itemClick(item.link)">
        <p> {{item.title}} </p>
        <div class="list-item-content">
          <p>作者：{{item.author}}</p>
          <p>分类：{{item.chapterName}}</p>
        </div>
        <p>时间: {{item.niceDate}}</p>
      </div>
    </li>
  </div>
</template>

<script>

import api from "../../api";
import Launch from "../../utils/launch";

export default {
  data() {
    return {
      linkList: [],
      sourceList: [],
      toolList: [],
    }
  },

  methods: {
    async getHarmonyData(isRefresh = false) {
      const res = await api.harmonyData();
      if (isRefresh) {
        wx.stopPullDownRefresh();
      }
      this.linkList = res.links.articleList;
      this.sourceList = res.open_sources.articleList;
      this.toolList = res.tools.articleList;
    },

    itemClick(url) {
      Launch.navigateTo("/pages/webview/main", {"url": url});
    }
  },

  created () {
    this.getHarmonyData()
  },

  onPullDownRefresh() {
    this.getHarmonyData(true)
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  color: cadetblue;
}
.list-item {
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}
.list-item-content {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
