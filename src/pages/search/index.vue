<template>
  <div>
    <mp-searchbar :isFocus=true
                  v-model="inputValue"
                  :placeholder="placeholder"
                  @on-input="onInputChange"
                  @confirm="confirmSearch">

    </mp-searchbar>
    <div>
      <li v-for="(item, index) in searchData" :key="index">
        <div class="list-item" @click="itemClick(item.link)">
          <p v-html="item.title"></p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>

import mpSearchbar from 'mpvue-weui/src/searchbar';
import api from "../../api";
import Launch from "../../utils/launch";

export default {
  components: {
    mpSearchbar,
  },

  data() {
    return {
      inputValue: '',
      placeholder: 'please input something',
      searchData: [],
      pageCount: 0,
    }
  },

  methods: {
    onInputChange(event) {
      this.inputValue = event.target.value;
    },
    confirmSearch(event) {
      this.search()
    },

    async search() {
      const data = await api.search(this.inputValue, 0)
      this.searchData = data.datas
      wx.stopPullDownRefresh();
    },

    async searchLoadMore() {
      this.pageCount++
      const data = await api.search(this.inputValue, this.pageCount)
      if (data.datas) {
        this.searchData = [...this.searchData, ...data.datas]
      } else {
        this.pageCount--
      }
    },

    itemClick(url) {
      Launch.navigateTo("/pages/webview/main", {"url": url});
    }
  },

  onReachBottom() {
    this.searchLoadMore();
  },

  onPullDownRefresh() {
    if (this.searchData.length > 0) {
      this.search()
    } else {
      wx.stopPullDownRefresh();
    }

  }

}
</script>

<style scoped>
.list-item {
  margin: 10px;
  border: 1px #000000 solid;
  padding: 10px;
}
</style>
