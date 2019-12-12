<template>
  <div class="wrap">
    <!-- <v-gologin></v-gologin> -->
    <ul class="something" v-if="carList">
      <li>
        <div class="something-left" @click="allToggle">
          <label class="true" :class="{false:!allChoseBool}">
            <input v-model="allChoseBool" />
          </label>
        </div>
        <div class="something-middle">全部商品</div>
      </li>
      <li v-for="(k,i) in carList" :key="i">
        <div class="something-left" @click="toggle(i)">
          <label class="true" :class="{false:!k.choseBool}">
            <input v-model="k.choseBool" />
          </label>
        </div>
        <div class="something-middle">
          <img :src="k.imgPath" />
        </div>
        <div class="something-right">
          <p>{{k.title}}</p>
          <p style="color:rgb(199, 108, 28)">18K金，宝石</p>
          <p>售价：{{k.price}}元</p>
          <div class="something-right-bottom" @click="cut(i)">
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
      carList: [
        {
          imgPath: require("@/assets/image/banner2.png"),
          choseBool: false,
          title: "Planet-戒指",
          price: "5000"
        },
        {
          imgPath: require("@/assets/image/banner2.png"),
          choseBool: false,
          title: "Planet-戒指2",
          price: "5000"
        }
      ]
    };
  },
  components: {
    "v-gologin": Gologin
  },

  mounted() {},

  methods: {
    /** 删除 */
    cut(i) {
      // 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
      let newCarList = [];

      for (let k = 0; k < this.carList.length; k++) {
        if (k !== i) {
          newCarList.push(this.carList[k]);
        }
      }
    },

    /** 单选 */
    toggle(i) {
      this.carList[i].choseBool = !this.carList[i].choseBool;
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
    allMoney(){
      let money = 0;
      this.carList.forEach(res=>{
        if(res.choseBool){
          money += Number(res.price);
        }
      })
      this.$store.commit("updateMoney", money);
      // this.$state.commit("updateNumber", money);
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
      height: 26vw;
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
</style>
