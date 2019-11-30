<template>
  <header>
    <img class="icon-go-left" src="../assets/image/home.png" @click="gotoHome" alt />
    <img src="../assets/image/logo.png" alt />
    <img class="icon-go" src="../assets/image/shopping_cart_black.png" @click="gotoCar" alt />
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
  methods: {
    gotoCar() {
      this.$router.push({ name: "购物车页" });
    },
    gotoHome() {
      this.$router.push({ name: "首页" });
    }
  }
};
</script>
