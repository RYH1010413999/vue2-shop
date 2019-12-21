<template>
  <div class="main">
    <img src="../assets/image/logo.png" alt />
    <div>
      <img src="../assets/image/wechat.png" alt />
       <p>客服微信</p>
    </div>

    <div>
      <img src="../assets/image/wechat.png" alt />
       <p>微信公众号</p>
    </div>

    <div>Ins : horus1924</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main {
  width: 295px;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-family: Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  font-size: 15px;
  border-top: 1px solid #000000;
  margin-top: 40px;
  & > img{
    width: 155px;
    height: 17px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  & > div{
    width: 300px;
    margin-top: 10px;
    margin-bottom: 30px;
    img{
      width: 200px;
      height: 200px;
    }
    p{
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>