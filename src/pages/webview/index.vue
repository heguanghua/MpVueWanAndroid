<template>
  <div>
    <web-view :src="webUrl"></web-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      webUrl: '',
    }
  },

  methods: {

  },

  onLoad(options) {
    console.log("webview", decodeURIComponent(options.url));
    if (options.url) {
      this.webUrl = decodeURIComponent(options.url);
    }
  }

}
</script>

<style scoped>

</style>
