<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header/>
    <v-swiper :swiperData="datas.swiper"/>
    <v-classification :classificationData="datas.classification"/>
    <v-commodityType :commodityTypeData="datas.commodityType"/>

    <v-baseline/>
    <!-- <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/> -->
    <!-- <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/> -->
    <!-- <v-section3/> -->
    <!-- <v-section4 :list="datas.section4.list" :banner='datas.section4.banner'/> -->
    <!-- <v-footer/> -->
    <v-customerServer/>
  </div>
</template>

<script>
import Header from "@/components/index/header.vue";
import Swiper from "@/components/index/swiper.vue";
import Classification from "@/components/index/classification.vue"; // 分类模块
import CommodityType from "@/components/index/commodityType.vue"; // 商品属性
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
    "v-customerServer": CustomerServer
  },
  data() {
    return {
      datas: {
        section1: {},
        section2: {},
        section3: {},
        section4: {},
        swiper: [
          { imgPath: require("@/assets/image/banner1.png") },
          { imgPath: require("@/assets/image/banner2.png") }
          // { imgPath: require("@/assets/image/banner3.png") },
          // { imgPath: require("@/assets/image/banner4.png") }
        ],
        classification: [
          { imgPath: require("@/assets/image/necklace.png") },
          { imgPath: require("@/assets/image/ring.png") },
          { imgPath: require("@/assets/image/earring.png") },
          { imgPath: require("@/assets/image/brooch.png") },
          { imgPath: require("@/assets/image/bracelet.png") },
          { imgPath: require("@/assets/image/others.png") }
        ],
        commodityType: [
          {
            imgPath: require("@/assets/image/commodityType1.png"),
            name: "Daydreaming"
          },
          {
            imgPath: require("@/assets/image/commodityType2.png"),
            name: "Gram"
          },
          {
            imgPath: require("@/assets/image/commodityType3.png"),
            name: "First Sign"
          },
          {
            imgPath: require("@/assets/image/commodityType4.png"),
            name: "Planet"
          }
        ]
      },
      loading: true
    };
  },

  beforeCreate() {
    // this.$api({
    //   method: 'post',
    //   url: '/index'
    // }).then((response) => {
    //   this.datas = response.data;
    // }).catch(function(error) {
    //   alert(error)
    // })
  }
};
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
