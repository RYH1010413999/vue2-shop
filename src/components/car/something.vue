<template>
  <div class="wrap">
    <!-- <v-gologin></v-gologin> -->
    <ul class="something" v-if="carList">
      <li>
        <div class="something-left" @click="allToggle">
          <label class="true" :class="{false:!allChoseBool}">
            <input type="checkbox" />
          </label>
        </div>
        <div class="something-middle">全部商品</div>
      </li>
      <li v-for="(item,i) in carList" :key="i">
        <div class="something-left" @click="toggle(item)">
          <label class="true" :class="{'false':!item.choseBool}">
            <input type="checkbox" />
          </label>
        </div>
        <div class="something-middle">
          <img :src="item.imageUrl" />
        </div>
        <div class="something-right">
          <p>{{item.title}}</p>
          <template v-for="item2 in item.productSpecsDesc">
            <template v-for="(item3,index3) in item2">
              <p style="color:rgb(199, 108, 28);font-size:10px;" :key="index3">{{item3}}</p>
            </template>
          </template>
          <p>售价：{{item.salePrice}}元</p>
          <div class="calculation">
            <span class="span1" @click="reduce(item)">-</span>
            <span class="span2">{{item.productNum}}</span>
            <span class="span1" @click="add(item)">+</span>
            <span class="span3">小计 {{item.productNum * item.salePrice}}</span>
          </div>
          <div class="something-right-bottom" @click="cut(item)">
            <span></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 提示登录组件
import Gologin from "@/components/car/gologin.vue";
import Util from "../../util/common";
export default {
  data() {
    return {
      allChoseBool: false,
      carList: []
    };
  },
  components: {
    "v-gologin": Gologin
  },

  mounted() {
    this.cartList();
  },

  methods: {
    /** 删除 */
    async cut(item) {
      const data = {
        product_sku_key: item.productSkuKey,
        type: "delete"
      };
      const res = await this.$axios.cartHandle(data);
      if (res.status === "20000") {
        this.cartList();
      }
    },

    /** 单选 */
    toggle(item) {
      item.choseBool = !item.choseBool;
      this.carList = [...this.carList];
      const every = this.carList.every(res => {
        return res.choseBool;
      });
      this.allChoseBool = every;
      this.allMoney();
    },
    /** 全选 */
    allToggle() {
      this.allChoseBool = !this.allChoseBool;
      this.carList.forEach(element => {
        element.choseBool = this.allChoseBool;
      });
      this.allMoney();
    },

    /** 计算购物车金额 */
    allMoney() {
      let money = 0;
      let num = 0;
      const data = [];
      this.carList.forEach(res => {
        if (res.choseBool) {
          money += Number(res.salePrice) * res.productNum;
          num += res.productNum;
          const item = {
            product_sku_key: res.productSkuKey,
            product_num: res.productNum
          };
          data.push(item);
        }
      });
      localStorage.productSkuKey = JSON.stringify(data);

      this.$store.commit("updateMoney", money);
      this.$store.commit("updateNumber", num);
    },

    /** 增加数量 */
    add(item) {
      item.productNum++;
      this.allMoney();
    },

    /** 减少数量 */
    reduce(item) {
      if (item.productNum === 0) {
        return;
      }
      item.productNum--;
      this.allMoney();
    },

    async cartList() {
      const res = await this.$axios.cartList({});
      if (res.status === "20000") {
        this.carList = res.data.list;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.wrap {
  width: 100%;
  .something {
    width: 100%;
    & > li {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 10px;
      position: relative;
      .bd();
      .something-left {
        -ms-flex: 2;
        -webkit-box-flex: 2;
        flex: 2;

        label {
          float: left;
          background: url("../../assets/car/images/t.svg") no-repeat center
            center/50% 50%;
          input {
            height: 14vw;
            width: 14vw;
            opacity: 0;
            filter: alpha(opacity=0);
          }
        }
        .false {
          background: url("../../assets/car/images/f.svg") no-repeat center
            center / 50% 50% !important;
        }
      }
      .something-middle {
        -ms-flex: 3;
        -webkit-box-flex: 3;
        flex: 3;
        height: 100%;
        padding-left: 2vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .something-right {
        -ms-flex: 7;
        -webkit-box-flex: 7;
        flex: 7;
        height: 100%;
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-flow: column wrap;
        flex-flow: column wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding-left: 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          .fz(font-size, 26);
        }
        p:last-of-type {
          .fz(font-size, 22);
          color: rgb(168, 168, 168);
        }
        .something-right-bottom {
          > div {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            input {
              width: 6vw;
              text-align: center;
            }

            span {
              height: 7vw;
              line-height: 7vw;
              width: 8vw;
              display: inline-block;
              border: 0.2vw solid #f1f1f1;
              border-radius: 1vw;
              text-align: center;
              font-size: 20px;
              cursor: pointer;
            }
          }
          > span {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 13vw;
            height: 13vw;
            background: url("../../assets/car/images/laji.svg") no-repeat
              center/50%;
          }
        }
      }
    }
    & > li:first-child {
      height: 50px;
      & > .something-middle {
        flex: 10;
        line-height: 25px;
      }
    }
  }
  label,
  span {
    &:active {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
}
.calculation {
  display: flex;
  height: 20px;
  text-align: center;
  align-items: center;
  margin-top: 5px;
  .span1 {
    display: block;
    border: 1px solid #9b9b9b;
    width: 20px;
  }
  .span2 {
    display: block;
    border: 1px solid #9b9b9b;
    width: 40px;
  }
  .span3{
    margin-left: 10px;
  }
}
</style>
