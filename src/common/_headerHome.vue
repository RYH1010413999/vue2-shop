<template>
  <header>
    <img class="icon-go-left" src="../assets/image/home.png" @click="gotoHome" alt />
    <img src="../assets/image/logo.png" alt />
    <div @click="gotoCar">
      <div>{{number}}</div>
      <img class="icon-go" v-if="number>0" src="../assets/image/shopping_cart_black.png"  alt />
      <img class="icon-go" v-else src="../assets/image/shopping_cart_empty.png"  alt />
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  background-color: white;
  text-align: center;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  & > div {
    position: relative;
    div {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      color: white;
      font-size: 12px;
      line-height: 36px;
    }
  }
  img {
    width: 125px;
    height: 14px;
  }
  .icon-go {
    width: 32px;
    height: 32px;
  }
  .icon-go-left {
    width: 22px;
    height: 22px;
  }
}
</style>


<script>
export default {
  data() {
    return {
      number: 0
    };
  },
  methods: {
    gotoCar() {
      console.log(1111);
      this.$router.push({ name: "购物车页" });
    },
    gotoHome() {
      this.$router.push({ name: "首页" });
    }
  },
  async mounted() {
    console.log(localStorage.login);
    if (localStorage.login === "true") {
      const res = await this.$axios.cartList({});
      if (res.status === "20000") {
        this.number = res.data.list.length;
      }
    }
  }
};
</script>
