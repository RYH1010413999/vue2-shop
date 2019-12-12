<template>
  <section class="chose">
    <div class="chose-view">
      <h1 class="chose-view-title">{{detail.spectrum}}-{{detail.title}}</h1>
      <div class="chose-view-price">¥ {{detail.minPrice}}元</div>
      <div class="chose-view-model">
        <div class="chose-view-model-name">
          <div>型号：{{detail.productSn}}</div>
          <div>
            <img src="../../assets/image/like.png" alt />
            <img src="../../assets/image/share.png" alt />
          </div>
        </div>
        <div class="chose-view-model-detail">
          <div v-for="(item,index) in detail.specs" :key="index">
            <div>{{item.specs}}:</div>
            <div
              class="detail-list"
              v-for="(item2,index2) in item.children"
              :class="item2.id === caizhi || item2.id === chicun?'active':''"
              @click="select(index,item2.id)"
              :key="index2"
            >{{item2.specs}}</div>
          </div>
        </div>

        <div class="shopping" @click="confirm">立即购买</div>
        <div class="chose-view-model-careful">
          <div>
            <div>使用注意</div>
            <img src="../../assets/image/add.png" alt />
          </div>
          <div>
            <div>销售条款</div>
            <img src="../../assets/image/add.png" alt />
          </div>
        </div>

        <div class="chose-view-model-end">
          <img src="../../assets/image/logo_center.png" alt />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapState } from "vuex";

export default {
  props: {
    detail: {
      type: Object,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      rangeValue: 55,
      caizhi: "",
      chicun: ""
    };
  },
  computed: mapState({}),
  methods: {
    select(index, id) {
      if (index === 0) {
        this.caizhi = id;
      }
      if (index === 1) {
        this.chicun = id;
      }
    },
    async getProductsPrice() {
      const data = {
        product_id: this.detail.id,
        caizhi: (this.caizhi !== ""
          ? this.caizhi
          : this.detail.specs[0].children[0].id),
        chicun: (this.chicun !== ""
          ? this.caizhi
          : this.detail.specs[1].children[0].id)
      };
      const res = await this.$axios.productsPrice(data);
      if (res.status === "20000") {
        localStorage.price = JSON.stringify(res.data);
      }
    },
    async confirm() {
      await this.getProductsPrice();
      localStorage.consirmOrder = JSON.stringify(this.detail);
      this.$router.push("/confirm/order");
    }
  },
  updated() {}
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

.chose {
  .chose-view {
    width: 312px;
    margin: 0 auto;

    &-title {
      text-align: center;
      font-size: 17px;
      margin-top: 20px;
      margin-bottom: 5px;
    }

    &-price {
      text-align: center;
      font-size: 17px;
      color: #d00202;
    }

    &-model {
      margin-top: 20px;

      &-name {
        font-size: 12px;
        color: #9b9b9b;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #000000;
        height: 30px;
        align-items: flex-end;
        padding-bottom: 8px;

        & > div:last-child {
          display: flex;
          align-items: center;

          & > img:first-child {
            width: 19px;
            height: 18px;
            margin-right: 22px;
          }

          & > img:last-child {
            width: 20px;
            height: 19px;
          }
        }
      }

      &-detail {
        height: auto;
        font-size: 12px;
        margin-top: 20px;
        & > div {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
          .detail-list {
            width: auto;
            height: 15px;
            line-height: 15px;
            border: 1px solid black;
            padding: 0 3px;
            margin-left: 20px;
          }
          .active {
            border-color: red;
          }
        }
      }

      &-careful {
        width: 100%;
        margin-top: 20px;
        & > div {
          border-bottom: 1px solid #9b9b9b;
          display: flex;
          justify-content: space-between;
          height: 20px;
          margin-bottom: 30px;
          & > img {
            width: 10px;
            height: 10px;
          }
        }
      }

      &-end {
        display: flex;
        justify-content: center;
        padding: 20px;
        & > img {
          width: 38px;
          height: 24px;
        }
      }
    }
  }
}
.shopping {
  background: #000000;
  width: 311px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  color: white;
  margin: 30px 0;
}
</style>