<template>
  <header>
    <img class="icon-go" src="../assets/image/back.png" @click="$router.go(-1)" alt="">
    <img src="../assets/image/logo.png" alt="">
  </header>
</template>


<style lang="less" scoped>
@import '../assets/fz.less';
@import '../assets/index/style.css';
header {
  background-color: white;
  text-align: center;
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  img{
    width: 125px;
    height: 14px;
  }
  .icon-go{
    position: absolute;
    left: 30px;
    width: 20px;
    height: 20px;
  }
}


</style>


<script>
export default {

}
</script>
