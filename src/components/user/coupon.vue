<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-content">
      <div class="main-content-title">优惠券</div>
      <template v-for="item in 5">
        <div class="main-content-list" :key="item">
          <div class="main-content-list-top">
            <div style="font-size: 14px;color:black;">¥ 40</div>
            <div>去使用 ></div>
          </div>
          <div>
            <div>满2000使用</div>
            <div>2019/11/20-2019/12/30</div>
          </div>
        </div>
      </template>
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
    &-list {
      height: 60px;
      border-bottom: 1px solid #9b9b9b;
      font-size: 12px;
      color: #9b9b9b;
      & > div {
        display: flex;
        justify-content: space-between;
      }
      &-top {
        padding: 5px 0;
        padding-top: 7px;
      }
    }
  }
}
</style>