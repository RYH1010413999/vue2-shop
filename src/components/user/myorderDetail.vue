<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-div">
      <div class="main">
        <div class="list list2">
          <div>
            <div>
              <div>{{orderDetail.receiver}} {{orderDetail.mobile}}</div>
              <div>{{orderDetail.address.province}} {{orderDetail.address.city}} {{orderDetail.address.area}} {{orderDetail.address.address_detail}}</div>
            </div>
          </div>
        </div>
        <div class="list">
          <template v-for="(item,index) in orderDetail.product_info">
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
            <div>¥ {{orderDetail.order_price}}</div>
          </div>
          <div>
            <div>运费</div>
            <div>{{orderDetail.express_price}}</div>
          </div>
          <div>
            <div>优惠券</div>
            <div>- {{orderDetail.coupon_price}}</div>
          </div>
          <div>
            <div>支付方式</div>
            <div>{{orderDetail.pay_method}}</div>
          </div>
          <div>
            <div>合计</div>
            <div>¥ {{orderDetail.final_price}}</div>
          </div>
        </div>
        <div class="list" v-if="orderDetail.express_sn">
          <div>
            <div>快递</div>
            <div>{{orderDetail.express_name}}</div>
          </div>
          <div>
            <div>快递单号</div>
            <div>{{orderDetail.express_sn}}</div>
          </div>
          <template v-for="(item,index) in personalExpress.list">
            <div :key="index">
              <div>{{item.status}}</div>
              <div>{{item.time}}</div>
            </div>
          </template>
        </div>
        <div class="list" v-if="orderDetail.order_status === 1">
          <div class="list-pay">
            <div @click="cancelOrder()">取消订单</div>
            <div @click="payOrder()">立即支付</div>
          </div>
        </div>
        <div class="list"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      orderDetail: {
        address: {}
      },
      personalExpress: {}
    };
  },
  methods: {
    async cancelOrder() {
      const data = {
        order_no: this.orderDetail.order_no
      };
      const res = await this.$axios.cancelOrder(data);
      if (res.status === "20000") {
        this.orderList(this.selected);
      }
    },
    payOrder() {
      localStorage.order_no = this.orderDetail.order_no;
      localStorage.price = this.orderDetail.final_price;
      this.$router.push("/payView");
    }
  },
  async mounted() {
    const data = {
      order_no: this.$route.params.id
    };
    const res = await this.$axios.orderDetail(data);
    if (res.status === "20000") {
      this.orderDetail = res.data;
    }
    if (this.orderDetail.express_id) {
      const res2 = await this.$axios.personalExpress(
        `personal/${this.orderDetail.express_id}/express/`,
        {}
      );
      if (res2.status === "20000") {
        this.personalExpress = res2.data;
        console.log(this.personalExpress);
      }
    }
  },
  components: {
    "v-header": Header
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  &-div {
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
      &-pay {
        & > div {
          background: #9b9b9b;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: white;
          border-radius: 2px;
        }
        & > div:last-child {
          background: #000000;
        }
      }
    }
  }
}
</style>