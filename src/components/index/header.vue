<template>
  <div class="header">
    <div class="header-basics">
      <img
        src="../../assets/image/nevigation.png"
        class="header-all-left"
        alt
        @click="showAll(true)"
      />
      <img class="header-center" src="../../assets/image/logo_white.png" alt />
      <img src="../../assets/image/shopping_cart_white.png" alt @click="gotoCar" />
    </div>
    <div class="header-all" v-if="show">
      <div class="header-basics">
        <img
          class="header-all-left"
          src="../../assets/image/nevigation_black.png"
          alt
          @click="showAll(false)"
        />
        <img class="header-all-center" src="../../assets/image/logo_center.png" alt />
        <div class="header-basics-img" @click="gotoCar">
          <div>{{number}}</div>
          <img
            class="icon-go"
            v-if="number>0"
            src="../../assets/image/shopping_cart_black.png"
            alt
          />
          <img
            class="icon-go"
            v-else
            src="../../assets/image/shopping_cart_empty.png"
            alt
          />
        </div>
      </div>
      <div class="header-all-bottom">
        <div class="header-all-bottom-search">
          <img src="../../assets/image/search.png" alt />
          <input type="text" placeholder="请输入搜索内容" />
        </div>
        <div class="header-all-bottom-list">
          <div @click="gitoSearch('all',0)">
            <div>
              <img src="../../assets/image/all_list1.png" alt />
            </div>
            <div>所有系列</div>
          </div>
          <template v-for="(item,index) in list">
            <div @click="gitoSearch('spectrum',item.id)" :key="index">
              <div>
                <img :src="list_icon[index].image" alt />
              </div>
              <div>{{item.spectrum}}</div>
            </div>
          </template>

          <div @click="gotoUser('/user')">
            <div>
              <img src="../../assets/image/all_list6.png" alt />
            </div>
            <div>个人中心</div>
          </div>

          <div @click="gotoUser('/explain/1')">
            <div>
              <img src="../../assets/image/aboutUs.png" alt />
            </div>
            <div>关于我们</div>
          </div>
        </div>
      </div>
      <!-- <div class="header-all-service">拨打客服中心</div> -->
    </div>
    <div class="header-all-shadow" v-if="show" @click="showAll(false)"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    list_icon: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      show: false,
      number: 0
    };
  },
  methods: {
    showAll(bool) {
      this.show = bool;
    },
    gotoUser(path) {
      this.$router.push({ path: path });
    },
    gotoCar() {
      this.$router.push({ name: "购物车页" });
    },
    gitoSearch(type, id) {
      this.$router.push({ path: `/search/${type}/${id}` });
    }
  },
  async mounted() {
    console.log(this.list_icon);
    if (localStorage.login === "true") {
      const res = await this.$axios.cartList({});
      if (res.status === "20000") {
        this.number = res.data.list.length;
      }
    }
  }
};
</script>

<style lang="less" scoped>
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

    &-img {
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
      img {
        width: 32px;
        height: 32px;
        float: left;
        display: block;
      }
    }

    & > img {
      width: 32px;
      height: 32px;
      float: left;
      display: block;
    }

    & > .header-center {
      width: 150px;
      height: 17px;
    }

    & > .header-all-center {
      width: 38px;
      height: 24px;
    }

    & > .header-all-left {
      width: 32px;
      height: 32px;
    }
  }

  &-all {
    width: 100%;
    height: 558px;
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
      z-index: 1;
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

        & > img {
          width: 18px;
          height: 17px;
        }

        & > input {
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

        & > div {
          display: flex;
          font-size: 13px;
          font-family: helvetica neue;
          align-items: center;
          height: 45px;
          border-bottom: 1px solid #f2f2f2;
        }

        & > div > div:first-child {
          width: 20px;
          margin-right: 24px;

          & > img {
            width: 20px;
            height: 20px;
          }
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