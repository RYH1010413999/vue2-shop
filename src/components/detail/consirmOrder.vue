<template>
  <div class="main">
    <v-header />
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
      <div>
        <div>
          <img :src="consirmOrder.headImageUrl" alt />
        </div>
        <div>共计一件商品 ></div>
      </div>
    </div>
    <!-- <div class="list">
      <div>
        <div>开具发票</div>
        <div>不开具发票 ></div>
      </div>
    </div>-->
    <div class="list">
      <div>
        <div>商品金额</div>
        <div>¥ {{price.salePrice}}</div>
      </div>
      <div>
        <div>运费</div>
        <div>0</div>
      </div>
      <div>
        <div>合计</div>
        <div>¥ {{price.salePrice}}</div>
      </div>
    </div>
    <div>
      <mt-checklist v-model="value" :options="['我已阅读并接受本订单适用的']"></mt-checklist>
      <div class="gotoAbout" @click="gotoAbout()">隐私政策、销售条款以及 退货政策</div>
      <mt-checklist v-model="value" :options="['接收 HORUS 新闻快讯及最新产品']"></mt-checklist>
    </div>
    <div class="shopping" @click="payment">立即支付</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      value: [],
      consirmOrder: {},
      address: {},
      price: {}
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    async payment() {
      const data = {
        products: [
          {
            product_sku_key: JSON.parse(localStorage.price).productSkuKey,
            product_num: "1"
          }
        ],
        address_id: JSON.parse(localStorage.address).id,
        remark: "111"
      };
      const res = await this.$axios.orderCreate(data);
      if (res.status === "20000") {
        localStorage.order_no = res.data.order_no;
        this.$router.push("/payView");
      } else {
        Toast(res.msg);
      }
    },
    gotoAddressList() {
      this.$router.push("/addressList/order");
    },
    gotoAbout() {
      this.$router.push("/explain/2");
    },
  },
  async mounted() {
    this.consirmOrder = JSON.parse(localStorage.consirmOrder);
    this.price = JSON.parse(localStorage.price);
    const res = await this.$axios.addressDefault({});
    if (res.status === "20000" && res.data) {
      this.address = res.data;
    }
    if (localStorage.address) {
      this.address = JSON.parse(localStorage.address);
    }
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
.gotoAbout{
  margin-left:24px;
  position: relative;
  bottom :10px;
  text-decoration:underline;
}
</style>