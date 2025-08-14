<template>
  <div class="login-pag">
    <h2 class="title">
      注册
    </h2>

    <div class="input-text">
      <label>
        账号
      </label>
      <input type="text" v-model="username" placeholder="请输入账号">
    </div>
    <div class="input-text">
      <label>
        密码
      </label>
      <input type="text" v-model="password" placeholder="请输入密码">
    </div>
    <div class="input-text">
      <label>
        确认密码
      </label>
      <input type="text" v-model="repassword" placeholder="请再次输入密码">
    </div>
    <button @click="register">注册</button>
    <button @click="goLogin">登录</button>
  </div>
</template>

<script>

import launch from "../../../utils/launch";
import toast from "../../../utils/toast";
import Api from "../../../api";
import Launch from "../../../utils/launch";
import Storage from "../../../utils/storage";

export default {
  data() {
    return {
      username: '',
      password: '',
      repassword: ''
    }
  },

  created () {

  },

  methods: {
    async register() {
      if (!this.username) {
        toast.toast("请输入账号")
        return
      }

      if (!this.password) {
        toast.toast("请输入密码")
        return
      }

      if (!this.repassword) {
        toast.toast("请再次输入密码")
        return
      }

      if (this.password !== this.repassword) {
        toast.toast("两次输入的密码不一致")
        return;
      }
      const res = Api.register(this.username, this.password, this.repassword)
      if (res) {
        Storage.remove("username")
        Storage.remove("password")
        Storage.remove("reminderInfo")
        toast.toast("注册成功")
        setTimeout(() => {
          Launch.reLaunch("/pages/auth/login/main", {username: this.username})
        }, 800)
      } else {
        toast.toast("注册失败")
      }

    },

    goLogin() {
      launch.reLaunch("/pages/auth/login/main")
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
  text-align: center;
}
.login-pag {
  padding: 20px;
  margin: 20px;
}
label {
  margin-bottom: 5px;
  font-weight: bold;
}

.input-text {
  margin-bottom: 10px;
}

input {
  border: 1px solid #ddd;
  padding: 10px;
}
button {
  margin-top: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border-radius: 5px;
}
</style>
