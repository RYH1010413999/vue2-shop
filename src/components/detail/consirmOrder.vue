<template>
  <div>
    <v-header />
    <div class="main">
      <div class="list list2">
        <div @click="gotoAddressList" v-if="address.receiver">
          <div>
            <div>{{address.receiver}} {{address.mobile}}</div>
            <div>{{address.province}} {{address.city}} {{address.area}} {{address.address_detail}}</div>
          </div>
          <div>></div>
        </div>
        <div @click="gotoAddressList" v-else>
          <div>设置收货地址</div>
          <div>></div>
        </div>
      </div>
      <div class="list">
        <template v-for="(item,index) in consirmOrder">
          <div :key="index">
            <div>
              <img :src="item.image" alt />
            </div>
            <div>
              <div>{{item.title}}</div>
              <div>{{item.sale_price}}</div>
            </div>
            <div>
              <div>数量{{item.product_num}}</div>
              <div>小计{{item.product_num * item.sale_price}}元</div>
            </div>
          </div>
        </template>
      </div>
      <div class="list">
        <div>
          <div>商品金额</div>
          <div>¥ {{price.order_price}}</div>
        </div>
        <div>
          <div>运费</div>
          <div>{{price.express_price}}</div>
        </div>
        <!-- <div>
          <div>优惠券</div>
          <div>- {{couponPrice}}</div>
        </div>-->
        <div>
          <div>合计</div>
          <div>¥ {{price.final_price}}</div>
        </div>
      </div>
      <div>
        <mt-checklist v-model="value" :options="['我已阅读并接受本订单适用的']"></mt-checklist>
        <div class="gotoAbout" @click="gotoAbout()">隐私政策、销售条款以及 退货政策</div>
        <mt-checklist v-model="value" :options="['接收 HORUS 新闻快讯及最新产品']"></mt-checklist>
      </div>
      <div class="shopping" @click="gotoPay">订单确认</div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      number: state => state.car.number,
      money: state => state.car.money
    })
  },
  data() {
    return {
      value: [],
      consirmOrder: [],
      address: {},
      price: {},
      couponPrice: ""
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    // 创建订单
    async payment() {
      const data = {
        products: JSON.parse(localStorage.productSkuKey),
        address_id: this.address.id,
        remark: "111"
      };
      const res = await this.$axios.orderCreate(data);
      if (res.status === "20000") {
        this.price = res.data;
        localStorage.order_no = res.data.order_no;
        localStorage.price = res.data.final_price;
        this.consirmOrder = res.data.product_info;
      } else {
        Toast(res.msg);
      }
      this.useCoupon();
    },

    // 获取可用优惠券
    async useCoupon() {
      const data = {
        order_no: localStorage.order_no
      };
      const res = await this.$axios.couponEnable(data);
      if (res.status === "20000" && res.data.enableCoupon.length) {
        this.couponPrice = res.data.enableCoupon[0].couponPrice;
      }
    },

    // 计算优惠券 之后的价格

    gotoAddressList() {
      this.$router.push("/addressList/order");
    },
    gotoAbout() {
      this.$router.push("/explain/2");
    },
    gotoPay() {
      this.$router.push("/payView");
    }
  },

  async mounted() {
    const res = await this.$axios.addressDefault({});
    if (localStorage.addressinfo) {
      this.address = JSON.parse(localStorage.addressinfo);
      this.payment();
      return;
    }
    if (res.status === "20000" && res.data) {
      this.address = res.data;
      this.payment();
      return;
    }
    Toast("请先添加收货地址！");
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 0 30px;

  .list {
    width: 100%;
    height: auto;
    font-size: 12px;
    color: #9b9b9b;
    padding: 10px 0;
    border-top: 1px solid #9b9b9b;

    & > div {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .list2 {
    margin-top: 30px;
  }

  /deep/ .mint-checklist {
    &-title {
      display: none;
    }

    .mint-cell {
      background: none;

      .mint-cell-wrapper {
        padding: 0;
        font-size: 12px;
        color: #9b9b9b;

        .mint-checklist-label {
          padding: 0;
        }

        .mint-checklist-title {
          display: none;
        }

        .mint-checkbox-core {
          width: 11px;
          height: 11px;
        }

        .mint-checkbox-input:checked + .mint-checkbox-core {
          background-color: #9b9b9b;
          border-color: #9b9b9b;
        }

        .mint-checkbox-core::after {
          display: none;
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

.gotoAbout {
  margin-left: 24px;
  position: relative;
  bottom: 10px;
  text-decoration: underline;
}
</style>