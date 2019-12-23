<template>
  <section class="chose">
    <div class="chose-view">
      <h1 class="chose-view-title">{{detail.spectrum}}-{{detail.title}}</h1>
      <div class="chose-view-price">¥ {{price.salePrice}}元</div>
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
              @click="select(index,item2)"
              :key="index2"
            >{{item2.specs}}</div>
          </div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">说明：</div>
          <div>
            <div v-html="detail.content"></div>
          </div>
        </div>

        <div class="shopping" @click="gotoConfirmOrder">立即购买</div>
        <div class="shopping" @click="addShoppingCart">加入购物车</div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">重要提示：</div>
          <div>
            <div v-html="detail.importantInfo"></div>
          </div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">细节：</div>
          <div>
            <div v-html="detail.nursingInfo"></div>
          </div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">物流运输：</div>
          <div>
            <div>{{prshopInfoice.express_content}}</div>
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
import { Toast } from "mint-ui";

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
      chicun: "",
      price: {},
      explain1: "", //sku信息
      explain2: "",
      prshopInfoice: {}
    };
  },

  computed: mapState({}),

  methods: {
    gotoAbout() {
      this.$router.push("/explain/2");
    },

    gotoConfirmOrder() {
      this.$router.push("/confirm/order");
    },

    select(index, item2) {
      if (index === 0) {
        this.caizhi = item2.id;
        this.explain1 = item2.specs_remark;
      }
      if (index === 1) {
        this.chicun = item2.id;
        this.explain2 = item2.specs_remark;
      }
      this.getProductsPrice();
    },

    async addShoppingCart() {
      const data = {
        product_sku_key: localStorage.productSkuKey,
        type: "plus"
      };
      const res = await this.$axios.cartHandle(data);
      if (res.status === "20000") {
        Toast("已成功加入购物车！")
      } else{
        Toast(res.msg)
      }
    },

    async getProductsPrice() {
      const data = {
        product_id: this.detail.id,
        caizhi: this.caizhi,
        chicun: this.chicun
      };
      const res = await this.$axios.productsPrice(data);
      if (res.status === "20000") {
        this.price = res.data;
        localStorage.productSkuKey = res.data.productSkuKey;
      }
    },

    async getShopInfo() {
      const res = await this.$axios.shopInfo({});
      if (res.status === "20000") {
        this.prshopInfoice = res.data;
      }
    }
  },

  mounted() {
    this.getShopInfo();
  },

  watch: {
    detail(val) {
      this.caizhi = this.detail.specs[0].children[0].id;
      this.chicun = this.detail.specs[1].children[0].id;
      this.explain1 = `${this.detail.specs[0].children[0].specs_remark}`;
      this.explain2 = `${this.detail.specs[1].children[0].specs_remark}`;
      this.getProductsPrice();
    }
  }
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
            height: 20px;
            line-height: 20px;
            padding: 0 10px;
            margin-left: 20px;
            background-color: #f8f8f8;
            border-radius: 10px;
          }

          .active {
            background-color: #928e8e;
            color: white;
          }
        }

        &-title {
          text-decoration: underline;
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

  & /deep/ .mint-popup {
    padding: 15px;
    line-height: 20px;
    border-radius: 5px;
    width: 80%;
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