<template lang="html">
    <div class = "header">
      <img src="../../assets/image/nevigation.png" alt="">
      <img src="../../assets/image/research.png" alt="" style="float:right">
    </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  @import "../../assets/fz.less";
  @import "../../assets/index/style.css";

  .header {
    width: 100%;
    height: 100px;
    z-index: 10;
    position: absolute;
    background-color: none;
    padding: 20px 30px;
    &>img{
      width: 32px;
      height: 32px;
      float: left;
      display: block;
    }
    
  }
</style>