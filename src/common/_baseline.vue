<template lang="html">
  <div class="main">
    <img src="../assets/image/logo.png" alt="">
    <div>
      QRcode
    </div>
  </div>

</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .main {
    width: 295px;
    margin:0 auto;
    text-align: center;
    color: #000;
    font-family: Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    font-size: 15px;
    border-top:1px solid #000000;
    margin-top: 40px;
    &>div {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      line-height: 80px;
      background: #d8d8d8;
    }
    &>img{
      width: 155px;
      height: 17px;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
</style>