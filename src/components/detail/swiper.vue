<template lang="html">
    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerImages" :key="index">
           <img :src="item">
        </mt-swipe-item>
      </mt-swipe>
      <div class="back" @click="goBack()">
        <span class="icon-go"></span>
      </div>
    </div>

</template>

<script>
export default {
  props: {
    bannerImages: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      history.back();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";

.swiper {
  width: 100%;
  position: relative;

  .mint-swipe {
    width: 100%;
    height: 384px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .back {
    width: 7vw;
    height: 7vw;
    position: absolute;
    left: 4vw;
    top: 2vw;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    text-align: center;
    span {
      display: inline-block;
      line-height: 7vw;
      .fz(font-size, 40);
      transform: rotate(-180deg);
      &::before {
        color: #fff;
      }
    }

    &:active {
      transform: scale(1.3);
    }
  }
}
</style>
