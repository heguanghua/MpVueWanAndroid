<template>
  <div class="login-pag">
    <h2 class="title">
      登录
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
    <div class="reminder-item">
      <div class="reminder-check" @click="onCheckBoxChange">
        <img class="reminder-img" v-if="reminderInfo" src="/static/images/checkbox-active.png" alt="">
        <img class="reminder-img" v-if="!reminderInfo" src="/static/images/checkbox.png" alt="">
        记住密码
      </div>
      <div @click="goRegister">注册</div>
    </div>
    <button @click="login">登录</button>
  </div>
</template>

<script>

import launch from "../../../utils/launch";
import api from "../../../api";
import toast from "../../../utils/toast";
import Launch from "../../../utils/launch";
import Storage from "../../../utils/storage";
import storage from "../../../utils/storage";

export default {
  data() {
    return {
      username: '',
      password: '',
      reminderInfo: false
    }
  },

  methods: {
    onCheckBoxChange() {
      this.reminderInfo = !this.reminderInfo
    },

    goRegister() {
      launch.reLaunch("/pages/auth/register/main")
    },

    async login() {
      if (!this.username) {
        toast.toast("请输入账号")
        return
      }

      if (!this.password) {
        toast.toast("请输入密码")
        return
      }

      const res = await api.login(this.username, this.password)
      if (res) {
        Storage.save("reminderInfo", this.reminderInfo)
        console.log(`login: ${this.reminderInfo}`)
        if (this.reminderInfo === true) {
          Storage.save("username", this.username)
          Storage.save("password", this.password)
        } else {
          Storage.remove("username")
          Storage.remove("password")
        }
        Launch.reLaunch("/pages/index/main")
      } else {
        toast.toast("登录失败")
      }
    }
  },

  mounted() {
    const reminderInfo = storage.getSync("reminderInfo");

    if (reminderInfo === true) {
      const username = storage.getSync("username");
      if (username) {
        this.username = username;
      }
      const password = storage.getSync("password");
      if (password) {
        this.password = password;
      }
    }
    this.reminderInfo = true
  },

  onReady() {
    console.log(`login.onReady1: username: ${this.username}; password: ${this.password}`);
  },

  onLoad(options) {
    const name = options.username;
    console.log(`onLoad: ${name}`)
    if (name) {
      this.username = name
      this.password = ""
      this.reminderInfo = false
    }
  },

  onUnload() {
    if (this.reminderInfo === false) {
      this.username = "";
      this.password = "";
    }
  }
}
</script>

<style scoped>

.login-pag {
  padding: 20px;
  margin: 20px;
}

.title {
  font-weight: bold;
  text-align: center;
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

.reminder-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.reminder-check {
  display: flex;
  align-items: center;
}

.reminder-img {
  width: 30px;
  height: 30px;
}

button {
  margin-top: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border-radius: 5px;
}
</style>
