<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-content">
      <div class="main-content-title">我的收藏</div>
      <div class="main-content-all">
        <template v-for="item in 5">
          <div class="main-content-all-list" :key="item">
            <div>
              <img src="../../assets/image/no_like.png" alt />
            </div>
            <div>
              <img src alt />
            </div>
            <div>Planet-项链</div>
            <div>型号：00000000</div>
            <div>¥ 5000</div>
            <div>加入购物车</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  methods: {
    gotoDetail() {
      this.$router.push({ name: "详情页" });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  &-content {
    width: 100%;
    padding: 10px 30px;
    font-size: 14px;
    &-title {
      border-bottom: 1px solid #9b9b9b;
      height: 25px;
    }
    &-all {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &-list {
        width: 147px;
        height: 300px;
        text-align: center;
        padding-top: 12px;
        & > div:nth-child(1) {
          width: 100%;
          height: 30px;
          text-align: right;
          & > img {
            width: 18px;
            height: 16px;
          }
        }
        & > div:nth-child(2) {
          width: 147px;
          height: 147px;
          text-align: center;
          background-color: #867979;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
        & > div:nth-child(3) {
          font-size: 14px;
          color: #000000;
        }
        & > div:nth-child(4) {
          font-size: 10px;
          color: #9b9b9b;
        }
        & > div:nth-child(5) {
          font-size: 11px;
          color: #d00202;
          margin:3px 0;
        }
        & > div:nth-child(6) {
          border: 1px solid #979797;
          width: 147px;
          height: 42px;
          line-height: 42px;
        }
      }
    }
  }
}
</style>