<template lang="html">
  <div class="detail">
    <v-swiper :bannerImages="detail.bannerImages"/>
    <v-chose :detail="detail"/>
    <!-- <v-content/> -->
    <!-- <v-baseline/> -->
    <!-- <v-footer/> -->
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
  methods:{
    
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
