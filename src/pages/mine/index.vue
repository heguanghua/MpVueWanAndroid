<template>
  <div>
    我的

    <button @click="openMyCollect">我的收藏</button>
    <button @click="loginClick">登录</button>
  </div>
</template>

<script>

import launch from "../../utils/launch";
import storage from "../../utils/storage";
import toast from "../../utils/toast";

export default {
  methods: {
    loginClick() {
      launch.reLaunch("/pages/auth/login/main")
    },
    openMyCollect() {
      const cookie = storage.getSync("cookie");
      if (cookie) {
        launch.reLaunch("/pages/collect/main")
      } else {
        toast.toast("请去登录")
      }
    }
  }
}
</script>

<style scoped>

</style>
