<template>
  <div>
    <v-header />
    <div class="content">
      <div class="content-title">需支付 ￥{{consirmOrder.minPrice}}</div>
      <div class="content-all">
        <div class="content-all-list" @click="select = '1'">
          <div>
            <img src alt />
          </div>
          <div>
            <p>微信支付</p>
            <p>微信安全支付</p>
          </div>
          <div>
            <label :class="select === '1'?'true':'false'">
              <input v-model="select" type="radio" />
            </label>
          </div>
        </div>

        <div class="content-all-list" @click="select = '2'">
          <div>
            <img src alt />
          </div>
          <div>
            <p>支付宝支付</p>
            <p>支付宝安全支付</p>
          </div>
          <div>
            <label :class="select === '2'?'true':'false'">
              <input v-model="select" type="radio" />
            </label>
          </div>
        </div>
      </div>
      <div class="shopping" @click="payment">付款</div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      select: "1",
      consirmOrder: {}
    };
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    },
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
      const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      // 选择微信 并且在 微信浏览器
      if (this.select === "1") {
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          data.pay_type = 1;
        }
      }
      // 选择支付宝
      if (this.select === "2") {
        data.pay_type = "2";
      }
      const res = await this.$axios.orderCreate(data);
      if (res.status === "20000") {
        if (
          ua.match(/MicroMessenger/i) == "micromessenger" &&
          this.select === "1"
        ) {
          this.wxPay(res);
        } else {
          window.location.href = res.data.url;
        }
      }
    },
    // 微信公众号支付
    wxPay(res) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        this.onBridgeReady(res);
      }
    },
    onBridgeReady(resp) {
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
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            window.location.href = "https://www.horus1924.com/#/success";
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast("您已取消了此次支付");
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            Toast("支付失败，请重新尝试");
          } else {
            Toast(res.err_msg);
          }
        }
      );
    }
  },
  mounted() {
    this.consirmOrder = JSON.parse(localStorage.consirmOrder);
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  padding: 0 30px;
  &-title {
    font-size: 17px;
    text-align: center;
    margin-top: 28px;
    margin-bottom: 40px;
  }
  &-all {
    &-list {
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      & > div:nth-child(2) {
        & > p:last-child {
          color: #a8a8a8;
        }
      }
    }
  }
}
label {
  float: left;
  background: url("../assets/car/images/t.svg") no-repeat center center/50% 50%;
  input {
    height: 14vw;
    width: 14vw;
    opacity: 0;
    filter: alpha(opacity=0);
  }
}
.false {
  background: url("../assets/car/images/f.svg") no-repeat center center / 50%
    50% !important;
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