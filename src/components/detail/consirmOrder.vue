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
            <div style="width:40%;">
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
        <div @click="popupVisible = true">
          <div>优惠券</div>
          <div>
            <span>-</span>
            <span v-if="this.useType === '1'">{{price.coupon_price}}</span>
          </div>
        </div>
        <div>
          <div>优惠码</div>
          <div>
            <span>-</span>
            <span v-if="this.useType === '2'">{{price.coupon_price}}</span>
            <input type="text" v-model="discountCode" @blur="useDiscountCode()" />
          </div>
        </div>
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
    <!-- 优惠券 -->
    <mt-popup v-model="popupVisible" position="right">
      <div class="popupVisible-div">
        <div class="main-content">
          <template v-if="enableCoupon.length >0">
            <template v-for="(item,index) in enableCoupon">
              <div class="main-content-list" :key="index" @click="selectCoupon(item)">
                <div class="main-content-list-top">
                  <div style="font-size: 14px;color:black;">¥ {{item.couponPrice}}</div>
                  <div v-if="item.select">已选</div>
                </div>
                <div>
                  <div>满{{item.fillPrice}}使用</div>
                  <!-- <div>{{item.receivedAt | date}} - {{item.maturityAt | date}}</div> -->
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <v-empyt></v-empyt>
          </template>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
import Empyt from "@/common/_empty.vue";
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
      couponCode: "",
      popupVisible: false, //优惠券窗口,
      enableCoupon: [],
      useType: "2", // 1优惠券， 2优惠码
      discountCode: "" // 优惠码
    };
  },
  filters: {
    date: function(value) {
      return value.substring(0, 10);
    }
  },
  components: {
    "v-header": Header,
    "v-empyt": Empyt
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
        this.consirmOrder = res.data.product_info;
        localStorage.order_no = res.data.order_no;
        localStorage.price = res.data.final_price;
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
        res.data.enableCoupon[0].select = true;
        this.couponCode = res.data.enableCoupon[0].couponCode;
        this.enableCoupon = res.data.enableCoupon;
        this.checkOrder();
      }
    },

    // 选择优惠券
    selectCoupon(item) {
      this.couponCode = item.couponCode;
      this.enableCoupon.forEach(element => {
        element.select = false;
      });
      item.select = true;
      this.popupVisible = false;
      this.checkOrder();
    },

    // 计算优惠券 之后的价格
    async checkOrder() {
      this.useType = "1";
      this.discountCode = "";
      const data = {
        order_no: localStorage.order_no,
        coupon_code: this.couponCode
      };
      const res = await this.$axios.orderCalculate(data);
      if (res.status === "20000") {
        this.price = res.data;
        localStorage.price = res.data.final_price;
      }
    },

    // 使用优惠码
    async useDiscountCode() {
      this.useType = "2";
      const data = {
        order_no: localStorage.order_no,
        coupon_mark: this.discountCode
      };
      const res = await this.$axios.orderCalculate(data);
      if (res.status === "20000") {
        this.enableCoupon.forEach(element => {
          element.select = false;
        });
        this.price = res.data;
        localStorage.price = res.data.final_price;
      }
      if (res.status === "41780") {
        this.enableCoupon.forEach(element => {
          element.select = false;
        });
        this.price = res.data;
        localStorage.price = res.data.final_price;
      }
    },

    gotoAddressList() {
      this.$router.push("/addressList/order");
    },
    gotoAbout() {
      this.$router.push("/explain/2");
    },
    async gotoPay() {
      const data = {
        order_no: localStorage.order_no,
        coupon_code: this.couponCode,
        address_id: this.address.id
      };
      if (this.useType === 2) {
        data.coupon_mark = this.discountCode;
      }
      const res = await this.$axios.orderConfirm(data);
      if (res.status === "20000") {
        localStorage.order_no = res.data.order_no;
        this.$router.push("/payView");
      }
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
      input {
        border: 1px solid #9b9b9b;
        border-radius: 5px;
        padding-left: 5px;
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
  width: 100%;
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

.popupVisible-div {
  width: 70vw;
  height: 100vh;
  .main-content {
    width: 100%;
    padding: 10px 30px;
    font-size: 14px;
    &-list {
      height: 60px;
      border-bottom: 1px solid #9b9b9b;
      font-size: 12px;
      color: #9b9b9b;
      & > div {
        display: flex;
        justify-content: space-between;
      }
      &-top {
        padding: 5px 0;
        padding-top: 7px;
      }
    }
  }
}
</style>