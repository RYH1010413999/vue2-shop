<template lang="html">
  <div class="header">
    <div class="header-basics">
      <img src="../../assets/image/nevigation.png" alt="" @click="showAll(true)">
      <img class="header-center" src="../../assets/image/logo_white.png" alt="">
      <img src="../../assets/image/shopping_cart_white.png" alt="" @click="gitoCar">
    </div>
    <div class="header-all" v-if="show">
      <div class="header-basics">
        <img class="header-all-left" src="../../assets/image/nevigation_black.png" alt="" @click="showAll(false)">
        <img class="header-all-center" src="../../assets/image/logo_center.png" alt="">
        <img src="../../assets/image/shopping_cart_black.png" alt="" @click="gitoCar">
      </div>
      <div class="header-all-bottom">
        <div class="header-all-bottom-search">
          <img src="../../assets/image/search.png" alt="">
          <input type="text" placeholder="请输入搜索内容">
        </div>
        <div class="header-all-bottom-list">

          <div>
            <div>
              <img src="../../assets/image/all_list1.png" alt="">
            </div>
            <div>所有系列</div>
          </div>

          <div>
            <div>
              <img src="../../assets/image/all_list2.png" alt="">
            </div>
            <div>Daydreaming</div>
          </div>
          <div>
            <div>
              <img src="../../assets/image/all_list3.png" alt="">
            </div>
            <div>Gram</div>
          </div>
          <div>
            <div>
              <img src="../../assets/image/all_list4.png" alt="">
            </div>
            <div>First Sign</div>
          </div>
          <div>
            <div>
              <img src="../../assets/image/all_list5.png" alt="">
            </div>
            <div>Planet</div>
          </div>
          <div @click="gotoUser">
            <div>
              <img src="../../assets/image/all_list6.png" alt="">
            </div>
            <div>个人中心</div>
          </div>
        </div>
      </div>
      <div class="header-all-service">拨打客服中心</div>
    </div>
    <div class="header-all-shadow" v-if="show" @click="showAll(false)"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      };
    },
    methods: {
      showAll(bool) {
        this.show = bool;
      },
      gotoUser(){
        this.$router.push({name:'用户页'})
      },
      gitoCar(){
        this.$router.push({name:'购物车页'})
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/fz.less";
  @import "../../assets/index/style.css";

  .header {
    position: relative;

    &-basics {
      width: 100%;
      height: 72px;
      z-index: 10;
      position: absolute;
      background-color: none;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &>img {
        width: 32px;
        height: 32px;
        float: left;
        display: block;
      }

      &>.header-center {
        width: 150px;
        height: 17px;
      }

      &>.header-all-center {
        width: 38px;
        height: 24px;
      }

      &>.header-all-left {
        width: 22px;
        height: 18px;
      }
    }

    &-all {
      width: 100%;
      height: 513px;
      position: absolute;
      top: 0;
      z-index: 11;
      background-color: white;
      border-bottom: 1px solid #9b9b9b;

      &-shadow {
        position: fixed;
        width: 100%;
        height: 100vh;
        background-color: black;
        opacity: 0.5;
      }

      &-bottom {
        width: 100%;
        margin-top: 85px;
        padding: 0 30px;

        &-search {
          width: 312px;
          height: 34px;
          background-color: #f2f2f2;
          border-radius: 5px;
          display: flex;
          align-items: center;
          padding-left: 10px;

          &>img {
            width: 18px;
            height: 17px;
          }

          &>input {
            width: 100%;
            border-radius: 5px;
            height: 100%;
            margin-left: 25px;
            background-color: #f2f2f2;
            font-size: 11px;
            color: #9b9b9b;
          }
        }

        &-list {
          width: 100%;
          margin-top: 20px;
          padding-left: 10px;

          &>div {
            display: flex;
            font-size: 14px;
            align-items: center;
            height: 45px;
            border-bottom: 1px solid #f2f2f2;
          }

          &>div>div:first-child {
            width: 20px;
            margin-right: 24px;

            &>img {
              width: 20px;
              height: 15px;
            }
          }

          &>div:nth-child(3)>div>img {
            width: 18px;
            height: 22px;
          }

          &>div:nth-child(4)>div>img {
            width: 14px;
            height: 22px;
          }

          &>div:nth-child(5)>div>img {
            width: 16px;
            height: 16px;
          }

          &>div:nth-child(6)>div>img {
            width: 18px;
            height: 19px;
          }

        }
      }

      &-service {
        width: 141px;
        height: 34px;
        background-color: #d9d7d8;
        font-size: 11px;
        color: black;
        text-align: center;
        line-height: 34px;
        margin: 30px auto;
      }
    }
  }
</style>