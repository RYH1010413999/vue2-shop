<template>
  <div class="main">
    <v-header />
    <div class="list list2">
      <div @click="gotoAddressList" v-if="address">
        <div>
          <div>{{address.receiver}}  {{address.mobile}}</div>
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
    <div class="list">
      <div>
        <div>开具发票</div>
        <div>不开具发票 ></div>
      </div>
    </div>
    <div class="list">
      <div>
        <div>商品金额</div>
        <div>¥ {{consirmOrder.minPrice}}</div>
      </div>
      <div>
        <div>运费</div>
        <div>0</div>
      </div>
      <div>
        <div>合计</div>
        <div>¥ {{consirmOrder.minPrice}}</div>
      </div>
    </div>
    <div>
      <mt-checklist v-model="value" :options="['我已阅读并接受本订单适用的 隐私政策、销售条款以及 退货政策']"></mt-checklist>
      <mt-checklist v-model="value" :options="['接收 HORUS 新闻快讯及最新产品']"></mt-checklist>
    </div>
    <div class="shopping" @click="payment">立即支付</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      value: [],
      consirmOrder: {},
      address: {}
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    onBridgeReady() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: resp.data.appId, //公众号名称，由商户传入
          timeStamp: resp.data.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: resp.data.nonceStr, //随机串
          package: resp.data.package,
          signType: resp.data.signType, //微信签名方式：
          paySign: resp.data.paySign //微信签名
        },
        this.aa(res)
      );
    },
    aa(res) {
      console.log(res);
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        // mdui.snackbar(resp.msg, {position: 'top'});
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // window.location.href='{{ path('pay_success') }}';
      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        mdui.snackbar("您已取消了此次支付", { position: "top" });
      } else if (res.err_msg == "get_brand_wcpay_request:fail") {
        mdui.snackbar("支付失败，请重新尝试", { position: "top" });
      } else {
        mdui.snackbar("未知错误", { position: "top" });
      }
    },

    async payment() {
      const data = {
        products: [
          {
            product_sku_key: JSON.parse(localStorage.price).productSkuKey,
            product_num: "1"
          }
        ],
        address_id: "4",
        remark: "111"
      };
      const res = await this.$axios.orderCreate(data);
      if (res.status === "20000") {
        window.location.href = res.data.url;
      }
      // this.onBridgeReady();
    },
    gotoAddressList() {
      this.$router.push("/addressList");
    }
  },
  mounted() {
    this.consirmOrder = JSON.parse(localStorage.consirmOrder);
    if (localStorage.address) {
      this.address = JSON.parse(localStorage.address);
    }

    // if (typeof WeixinJSBridge == "undefined") {
    //   if (document.addEventListener) {
    //     document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    //   } else if (document.attachEvent) {
    //     document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
    //     document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    //   }
    // } else {
    //   this.onBridgeReady();
    // }
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
</style>