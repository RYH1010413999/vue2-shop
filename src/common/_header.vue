<template>
  <header>
    <router-link
     class="icon-go"
     :to="{ name: '首页'}"
     v-if="$route.matched[0].path=='/category'">
    </router-link>
    
    <span class="icon-go"  @click="$router.go(-1)" v-else></span>
    <img src="../assets/image/logo.png" alt="">
  </header>
</template>


<style lang="less" scoped>
@import '../assets/fz.less';
@import '../assets/index/style.css';
header {
  background-color: #F8FCFF;
  text-align: center;
  position: relative;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  img{
    width: 155px;
    height: 17px;
  }
  .icon-go{
    position: absolute;
    left: 20px;
  }
  span,a {
    display: inline-block;
    .fz(font-size,46);
    transform: rotate(-180deg);
    &::before {
      color:#333;
    }
  }
}


</style>


<script>
export default {

}
</script>
