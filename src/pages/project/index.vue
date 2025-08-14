<template>
  <div>
    <div class="tab-container">
      <scroll-view class="tab-bar" scroll-x enable-flex>
        <div class="tab-bar-item"
             v-for="(item, index) in tabs"
             :key="index"
             :class="{active: curTabIndex === index}"
             @click="onTabChange(index, item.id)">
          <p class="tab-bar-item-title">{{ item.name }}</p>
        </div>
      </scroll-view>
    <li class="content-list" v-for="(item, index) in projectList" :key="index">
      <div class="content-list-item" @click="intoDetail(item)">
        <div class="content-list-item-img-container">
          <img class="content-list-item-img" :src="item.envelopePic" alt=""/>
        </div>
        <div class="list-item-column">
          <div class="list-item-title">{{ item.title }}</div>
          <div >{{ item.desc }}</div>
          <div class="list-item-date">{{ item.niceDate }}</div>
        </div>
      </div>

    </li>
    </div>
  </div>
</template>

<script>
import Api from "../../api";
import Launch from "../../utils/launch";
export default {
  data() {
    return {
      tabs: [],
      projectList: [],
      curTabIndex: 0,
    }
  },
  methods: {
    onTabChange(index, id) {
      this.curTabIndex = index;
      this.getProjectList(id)
    },

    async getProjectType() {
      const datas = await Api.getProjectType()
      console.log("getProjectType", datas)
      if (datas) {
        this.tabs = datas
        if (this.tabs.length > 0) {
          const id = this.tabs[0].id;
          await this.getProjectList(id)
        }
      }
    },

    async getProjectList(id) {
      const data = await Api.getProjectList(id)
      if (data.datas) {
        this.projectList = data.datas
      }
    },

    intoDetail(item) {
      Launch.navigateTo("/pages/webview/main", {"url": item.link});
    }
  },

  onLoad() {
    this.getProjectType()
  }
}
</script>

<style scoped>
.tab-container {
  width: 100%;
  height: 40px;
}
.tab-bar {
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 10px;
}
.tab-bar-item {
  flex-shrink: 0;
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  position: relative; /* 为底部横线定位 */
}
.tab-bar-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #007bff;
}

.content-list-item-img-container {
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
}

.content-list-item-img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.list-item-title {
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.list-item-date {
  text-align: end;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
