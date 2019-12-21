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
            <div class="detail-list" v-for="(item2,index2) in item.children"
              :class="item2.id === caizhi || item2.id === chicun?'active':''" @click="select(index,item2)"
              :key="index2">{{item2.specs}}</div>
          </div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">说明：</div>
          <div v-html="detail.content"></div>
        </div>

        <div class="shopping" @click="gotoConfirmOrder">立即购买</div>
        <!-- <div class="chose-view-model-careful">
          <div @click="popupVisible1 = true">
            <div>使用注意</div>
            <img src="../../assets/image/add.png" alt />
          </div>
          <div @click="gotoAbout()">
            <div>销售条款</div>
            <img src="../../assets/image/add.png" alt />
          </div>
        </div>-->

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">重要提示：</div>
          <div v-html="detail.importantInfo"></div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">细节：</div>
          <div v-html="detail.nursingInfo"></div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">物流运输：</div>
          <div>{{prshopInfoice.express_content}}</div>
        </div>

        <mt-popup v-model="popupVisible1">
          <p>产品描述中备注的注意事项：</p>
          <p>• 产品中使用的珍珠均为天然珍珠，色彩和形状大小差异造就了每件产品的独特性。介意者请谨慎购买，购买前可联系客服咨询。</p>
          <p>• 部分耳饰由于材料存在一定重量的自重，在长时间佩戴的情况下有可能会影响佩戴舒适感。</p>
        </mt-popup>

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
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        rangeValue: 55,
        caizhi: "",
        chicun: "",
        popupVisible1: false,
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

      async getProductsPrice() {
        const data = {
          product_id: this.detail.id,
          caizhi: this.caizhi,
          chicun: this.chicun
        };
        const res = await this.$axios.productsPrice(data);
        if (res.status === "20000") {
          this.price = res.data;
          localStorage.price = JSON.stringify(res.data);
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
        localStorage.consirmOrder = JSON.stringify(this.detail);
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

          &>div:last-child {
            display: flex;
            align-items: center;

            &>img:first-child {
              width: 19px;
              height: 18px;
              margin-right: 22px;
            }

            &>img:last-child {
              width: 20px;
              height: 19px;
            }
          }
        }

        &-detail {
          height: auto;
          font-size: 12px;
          margin-top: 20px;

          &>div {
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

          &-title{
            text-decoration: underline;
          }
        }

        &-careful {
          width: 100%;
          margin-top: 20px;

          &>div {
            border-bottom: 1px solid #9b9b9b;
            display: flex;
            justify-content: space-between;
            height: 20px;
            margin-bottom: 30px;

            &>img {
              width: 10px;
              height: 10px;
            }
          }
        }

        &-end {
          display: flex;
          justify-content: center;
          padding: 20px;

          &>img {
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