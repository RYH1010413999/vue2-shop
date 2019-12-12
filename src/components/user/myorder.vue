<template>
  <div class="main">
    <v-header></v-header>
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">全部</mt-tab-item>
        <mt-tab-item id="2">待支付</mt-tab-item>
        <mt-tab-item id="3">待发货</mt-tab-item>
        <mt-tab-item id="4">待收货</mt-tab-item>
        <mt-tab-item id="5">已完成</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="list">
            <div>
              <div class="list-color">订单编号：129310203913401</div>
              <div>待支付</div>
            </div>
            <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>
            <div>
              <div class="list-image"></div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ 5，000 x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥0.00</div>
              <div>合计: ￥ 5，000</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2"></mt-tab-container-item>
        <mt-tab-container-item id="3"></mt-tab-container-item>
        <mt-tab-container-item id="4"></mt-tab-container-item>
        <mt-tab-container-item id="5"></mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      selected: "1"
    };
  },
  components: {
    "v-header": Header
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    padding: 0 30px;
    .list {
      padding-top: 10px;
      font-size: 12px;
      border-bottom: 1px solid #9b9b9b;
      padding-bottom: 10px;
      & > div {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      &-color {
        color: #9b9b9b;
      }
      &-image {
        width: 135px;
        height: 135px;
        background-color: red;
      }
      &-detail {
        div {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>