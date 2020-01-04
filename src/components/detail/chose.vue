<template>
  <section class="chose">
    <div class="chose-view">
      <h1 class="chose-view-title">{{detail.spectrum}}-{{detail.title}}</h1>
      <div class="chose-view-price">¥ {{price.salePrice?price.salePrice:detail.minPrice}}元</div>
      <div class="chose-view-model">
        <div class="chose-view-model-name">
          <div>型号：{{detail.productSn}}</div>
          <div>
            <!-- <img src="../../assets/image/like.png" alt />
            <img src="../../assets/image/share.png" alt />-->
          </div>
        </div>
        <div class="chose-view-model-detail">
          <div v-for="(item,index) in detail.specs" :key="index">
            <div style="width:20%;">{{item.specs}}:</div>
            <div style="display:flex; flex-wrap: wrap;width:80%;">
              <template v-for="(item2,index2) in item.children">
                <template v-if="obj[item2.id] || first">
                  <template v-if="!item2.image_thumb">
                    <div
                      class="detail-list"
                      :class="item2.active?'active':''"
                      @click="select(index,item2.id)"
                      :key="index2"
                    >{{item2.specs}}</div>
                  </template>

                  <template v-if="item2.image_thumb">
                    <div
                      class="detail-list-img"
                      :class="item2.active?'active-img':''"
                      @click="selectImg(index,item2)"
                      :key="index2"
                    >
                      <img :src="item2.image_thumb" alt />
                      <div>{{item2.specs}}</div>
                    </div>
                  </template>
                </template>

                <template v-else>
                  <template v-if="!item2.image_thumb">
                    <div class="detail-list noSelect" :key="index2">{{item2.specs}}</div>
                  </template>

                  <template v-if="item2.image_thumb">
                    <div class="detail-list-img noSelect" :key="index2">
                      <img :src="item2.image_thumb" alt />
                      <div>{{item2.specs}}</div>
                    </div>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </div>

        <div class="chose-view-model-detail">
          <div class="chose-view-model-detail-title">说明：</div>
          <div>
            <div v-html="detail.content"></div>
          </div>
        </div>

        <div class="shopping-div">
          <div class="shopping" @click="addShoppingCart">加入购物车</div>
          <div class="shopping" @click="gotoConfirmOrder">立即购买</div>
        </div>

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
      <div v-if="image_big" class="big-img">
        <div @click="image_big = ''"></div>
        <img :src="image_big" alt />
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
      price: {},
      prshopInfoice: {},
      image_big: "", // 大图,
      used_keys: [], // 总的可用sku，
      select_sku: [], // 选中sku
      obj: [], // 页面判定 是否 可用
      first: true // 是否是首次点击sku
    };
  },

  computed: mapState({}),

  methods: {
    gotoAbout() {
      this.$router.push("/explain/2");
    },

    gotoConfirmOrder() {
      if (!this.price.salePrice) {
        Toast("请选择商品属性");
        return;
      }
      this.$router.push("/confirm/order");
    },

    selectImg(index, item2) {
      this.image_big = item2.image;
      this.select(index, item2.id);
    },

    select(index, id) {
      const obj = [];
      let intersection = [];
      this.first = false;
      this.select_sku[index] = id;
      this.select_sku.forEach((res,res_index) => {
        const used_keys = [];
        this.used_keys.forEach(res2 => {
          if (res2[res_index] === res) {
            used_keys.push(res2);
          } else {
            used_keys.push(res2[res_index]);
          }
        });
        // 数组转为一纬数组
        const arry = Array.from(new Set(used_keys.flat()));
        if (intersection.length === 0) {
          intersection = arry;
        } else {
          intersection = arry.filter(v => intersection.includes(v));
        }
      });

      intersection.forEach(res => {
        obj[`${res}`] = true;
      });
      this.obj = obj;

      // 选中状态
      this.detail.specs.forEach((el, elIndex) => {
        el.children.forEach(el2 => {
          const bool = this.select_sku.includes(el2.id);
          if (bool) {
            el2.active = true;
          } else {
            el2.active = false;
          }
        });
      });
      const select_sku = [];
      this.detail.specs = [...this.detail.specs];
      this.select_sku.forEach(res => {
        select_sku.push(res);
      });
      if (select_sku.length < this.detail.specs.length) {
        return;
      }
      this.getProductsPrice(select_sku);
    },

    async addShoppingCart() {
      const data = {
        product_sku_key: JSON.parse(localStorage.productSkuKey)[0]
          .product_sku_key
      };
      const res = await this.$axios.cartHandle(data);
      if (res.status === "20000") {
        Toast("已成功加入购物车！");
      } else {
        Toast(res.msg);
      }
    },

    async getProductsPrice(arry) {
      const data = {
        product_id: this.detail.id,
        keys: arry,
        product_num: 1
      };
      const res = await this.$axios.productsPrice(data);
      if (res.status === "20000") {
        this.price = res.data;
        localStorage.productSkuKey = JSON.stringify([
          {
            product_sku_key: res.data.productSkuKey,
            product_num: res.data.productNum
          }
        ]);
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
      this.used_keys = val.used_keys;
      console.log(this.used_keys);
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
        &-title {
          width: 60px;
        }

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
            // background-color: #f8f8f8;
            border: 1px solid #928e8e;
            border-radius: 10px;
            margin-bottom: 10px;
          }

          .active {
            background-color: #928e8e;
            color: white;
          }

          .noSelect {
            // background-color: #f8f8f8;
            opacity: 0.5;
            color: black;
          }

          .detail-list-img {
            width: 70px;
            height: 70px;
            font-size: 10px;
            text-align: center;
            & > img {
              width: 50px;
              height: 50px;
              border: 1px solid #928e8e;
            }
          }

          .active-img {
            & > img {
              border: 1px solid #333333;
            }
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

.shopping-div {
  display: flex;
  justify-content: space-between;
  .shopping {
    background: #000000;
    width: 49%;
    height: 42px;
    text-align: center;
    line-height: 42px;
    color: white;
    margin: 30px 0;
  }
  .shopping:first-child {
    background-color: #d9d7d8;
    color: #000000;
  }
}

.big-img {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  div {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-color: #333333;
  }
  img {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>