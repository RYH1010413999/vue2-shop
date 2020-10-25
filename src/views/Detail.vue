<template lang="html">
  <div class="detail">
    <v-swiper :bannerImages="detail.bannerImages"/>
    <v-chose :detail="detail"/>
    <!-- <v-content/> -->
    <!-- <v-baseline/> -->
    <!-- <v-footer/> -->
    <div class="end" @click="goto('首页')">< 返回首页</div>
  </div>
</template>

<script>
import Swiper from "@/components/detail/swiper.vue";
import Chose from "@/components/detail/chose.vue";
// import Content from '@/components/detail/content.vue' //商品内容
import Footer from "@/components/detail/footer.vue";
// import Baseline from '@/common/_baseline.vue'  // 通用页尾
export default {
  data() {
    return {
      detail: {}
    };
  },
  components: {
    "v-swiper": Swiper,
    "v-chose": Chose,
    // 'v-content':Content,
    "v-footer": Footer
    // 'v-baseline':Baseline
  },

  beforeCreate() {},

  async mounted() {
    const data = {
      product_sn: this.$route.params.id
    };
    const res = await this.$axios.productsDetail(data);
    if (res.status === "20000") {
      this.detail = res.data;
      console.log(this.detail);
    }
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    }
  },
  created() {
    //判断是否是IOS设备
    // IOS分享时的页面是首页，也就是进入页而不是当前页。所有可以采用刷新当前页，让进入页的链接改成当前页，再在页面卸载时删除缓存数据。
    // let agent = navigator.userAgent;
    // let isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    // if (isIOS && !sessionStorage.getItem("isShareState")) {
    //   sessionStorage.setItem("isShareState", true);
    //   console.log(this.$route.path);
    //   location.assign(`${window.location.origin}#${this.$route.path}`);
    // }
  },
  destroyed() {
    // sessionStorage.removeItem("isShareState");
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  padding-bottom: 14vw;
}
.end {
  font-size: 14px;
  color: #9b9b9b;
  width: 73px;
  height: 20px;
  margin: 0 auto;
  border-bottom: 1px solid #9b9b9b;
  margin-top: 40px;
}
</style>
