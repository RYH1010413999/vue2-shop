<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header :list="datas.commodityType" :list_icon="datas.navlist"/>
    <v-swiper :swiperData="datas.swiper"/>
    <v-classification/>
    <v-commodityType :commodityTypeData="datas.commodityType"/>

    <v-baseline/>
    <!-- <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/> -->
    <!-- <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/> -->
    <!-- <v-section3/> -->
    <!-- <v-section4 :list="datas.section4.list" :banner='datas.section4.banner'/> -->
    <!-- <v-footer/> -->
    <!-- <v-customerServer/> -->
  </div>
</template>

<script>
import Header from "@/components/index/header.vue";
import Swiper from "@/components/index/swiper.vue";
import Classification from "@/components/index/classification.vue"; // 分类模块
import CommodityType from "@/components/index/commodityType.vue"; // 商品系列
import Baseline from "@/common/_baseline.vue";
import Section1 from "@/components/index/section1.vue"; //  热推模块
// import Section2 from '@/components/index/section2.vue' //  横向滑动模块
// import Section3 from '@/components/index/section3.vue' //  秒杀模块
// import Section4 from '@/components/index/section4.vue' //  猜你喜欢
import Footer from "@/common/_footer.vue";
import CustomerServer from "@/common/_customerServer.vue";
export default {
  components: {
    "v-header": Header,
    "v-swiper": Swiper,
    "v-classification": Classification,
    "v-commodityType": CommodityType,
    "v-baseline": Baseline,
    // 'v-section1': Section1,
    // 'v-section2': Section2,
    // 'v-section3': Section3,
    // 'v-section4': Section4,
    "v-footer": Footer,
    "v-customerServer": CustomerServer,
  },
  data() {
    return {
      datas: {
        section1: {},
        section2: {},
        section3: {},
        section4: {},
        swiper: [],
        commodityType: [],
        navlist:[]
      },
      loading: true
    };
  },

  async beforeCreate() {
    const spectrum = await this.$axios.spectrum({});
    const navlist = await this.$axios.navlist({});
    if (spectrum.status === "20000") {
      this.datas.commodityType = spectrum.data;
    }

    if (navlist.status === "20000") {
      this.datas.navlist = navlist.data;
    }

    const res = await this.$axios.shopBanner({});
    if (res.status === "20000") {
      this.datas.swiper = res.data;
    }
  },

  mounted() {}
};
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
