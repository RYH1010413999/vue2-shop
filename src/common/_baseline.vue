<template>
  <div class="main">
    <img src="../assets/image/logo.png" alt />
    <div class="main-list">
      <div>
        <img src="../assets/image/wechat.png" alt />
        <p>客服微信</p>
      </div>

      <div>
        <img src="../assets/image/WechatIMG2.png" alt />
        <p>微信公众号</p>
      </div>
    </div>

    <div class="bottom_list">
      <img src="../assets/image/ins.png" alt />
      <span>Ins : horus1924</span>
    </div>

    <div class="bottom_list">
      <span>官网：</span>
      <span>
        <a href="http://www.horus1924.com">www.horus1924.com</a>
      </span>
    </div>

    <div class="bottom_list">
      <span>展厅：杭州市西湖区留和路139号东信.和创园23幢</span>
    </div>

    <div class="bottom_list">
      <span>电子邮箱：</span>
      <span>info@horus1924.com</span>
    </div>
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
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  &-list {
    display: flex;
    & > div {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 30px;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  & > img {
    width: 155px;
    height: 17px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .bottom_list{
    margin-bottom: 10px;
    font-size: 12px;
  }
}
</style>