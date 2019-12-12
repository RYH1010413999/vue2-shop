<template>
  <div class>
    <v-header></v-header>
    <div class="main-head">
      <div class="main-head-img">
        <img :src="userInfo.avatar" alt />
      </div>
      <div>{{userInfo.nick_name}}</div>
    </div>
    <div class="main-all">
      <div class="main-all-list" @click="gotomyorder">
        <div>我的订单</div>
        <div>></div>
      </div>
      <div class="main-all-list main-all-special" @click="gotomyorder">
        <div class="main-all-list-shopping">
          <img src="../assets/image/user_shopping1.png" alt />
          <div>待支付</div>
        </div>
        <div class="main-all-list-shopping">
          <img src="../assets/image/user_shopping2.png" alt />
          <div>待发货</div>
        </div>
        <div class="main-all-list-shopping">
          <img src="../assets/image/user_shopping3.png" alt />
          <div>待收货</div>
        </div>
        <div class="main-all-list-shopping">
          <img src="../assets/image/user_shopping4.png" alt />
          <div>已完成</div>
        </div>
        <div class="main-all-list-shopping">
          <img src="../assets/image/user_shopping5.png" alt />
          <div>售后</div>
        </div>
      </div>
      <div class="main-all-list" @click="goto('收藏')">
        <div>我的收藏</div>
        <div>></div>
      </div>
      <div class="main-all-list" @click="goto('优惠券')">
        <div>优惠券</div>
        <div>></div>
      </div>
      <div class="main-all-list" @click="goto('个人信息')">
        <div>个人信息</div>
        <div>></div>
      </div>
      <div class="main-all-list" @click="goto('收货地址')">
        <div>收货地址</div>
        <div>></div>
      </div>
    </div>
    <div class="end" @click="goto('首页')">< 返回首页</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    },
    gotomyorder(){
      this.$router.push({ name: '我的订单' });
    }
  },
  mounted(){
    this.userInfo = JSON.parse(localStorage.userInfo);
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  &-head {
    width: 100%;
    padding: 0 30px;
    font-size: 17px;
    display: flex;
    align-items: center;
    margin-top: 35px;
    &-img {
      width: 60px;
      height: 60px;
      background: #d8d8d8;
      border-radius: 50%;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  &-all {
    width: 100%;
    padding: 0 30px;
    margin-top: 50px;
    &-list {
      width: 100%;
      height: 48px;
      border-top: 1px solid #9b9b9b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-list:last-child {
      border-bottom: 1px solid #9b9b9b;
    }
    &-special {
      height: 113px;
      padding: 0 20px;
      & > div {
        text-align: center;
        img {
          width: 22px;
          height: 20px;
          margin-bottom: 5px;
        }
      }
    }
  }
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