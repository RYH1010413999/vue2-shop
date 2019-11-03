<template lang="html">
  <div class="main">
    <h3>H O R U S &nbsp 1 9 2 4</h3>
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
    h3{
      font-weight: 700;
      margin-bottom:30px;
      margin-top:5px;
      letter-spacing: .5px;
    }

    &>div {
      width: 80px;
      height: 80px;
      margin: 0 auto;
      line-height: 80px;
      background: #d8d8d8;
    }
  }
</style>