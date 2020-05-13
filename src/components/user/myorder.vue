<template>
  <div class="main">
    <v-header></v-header>
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id>全部</mt-tab-item>
        <mt-tab-item id="1">待支付</mt-tab-item>
        <mt-tab-item id="2">待发货</mt-tab-item>
        <mt-tab-item id="3">待收货</mt-tab-item>
        <mt-tab-item id="4">已完成</mt-tab-item>
        <mt-tab-item id="5">售后</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item :id="selected">
          <template v-if="list.length>0">
            <div
              class="list"
              v-for="(item,index) in list"
              :key="index"
              @click="gotoMyorderDetail(item)"
            >
              <div>
                <div class="list-color">订单编号：{{item.orderNo}}</div>
                <div>{{item.orderStatus | Status}}</div>
              </div>
              <template v-for="(item2,index2) in item.orderItem">
                <div :key="index2">
                  <div class="list-image">
                    <img :src="item2.imageUrl" alt />
                  </div>
                  <div class="list-detail">
                    <div>{{item2.productName}}</div>
                    <div>编号{{item2.productSn}}</div>
                    <div>
                      <span>尺寸：</span>
                      <template v-for="(item3,index3) in item2.productDesc['尺寸']">
                        <span :key="index3">{{item3}}</span>
                      </template>
                    </div>
                    <div>￥ {{item2.salePrice}} x {{item2.productNum}}</div>
                  </div>
                </div>
              </template>
              <div>
                <div>共计1件商品，运费￥{{item.policyPrice}}</div>
                <div>合计: ￥ {{item.finalPrice}}</div>
              </div>
              <template v-if="item.orderStatus === 1">
                <div class="list-pay">
                  <div @click.stop="cancelOrder(item)">取消订单</div>
                  <div @click.stop="payOrder(item)">立即支付</div>
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <v-empyt></v-empyt>
          </template>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Empyt from "@/common/_empty.vue";
export default {
  data() {
    return {
      selected: "1",
      list: [],
      listAll: []
    };
  },
  filters: {
    Status: function(value) {
      let data;
      switch (value) {
        case 0:
          data = "待下单";
          break;
        case 1:
          data = "待支付";
          break;
        case 2:
          data = "待发货";
          break;
        case 3:
          data = "待收货";
          break;
        case 4:
          data = "已签收";
          break;
        case 5:
          data = "已完成";
          break;
        case 6:
          data = "售后处理中";
          break;
        case 7:
          data = "退货换货";
          break;
        case 8:
          data = "退货退款";
          break;
        case 9:
          data = "退款不退货";
          break;
        case 10:
          data = "已结单";
          break;
        case 11:
          data = "已关闭";
          break;
        case 12:
          data = "已取消";
          break;
        case 13:
          data = "交易关闭";
          break;
        default:
          break;
      }
      return data;
    }
  },
  components: {
    "v-header": Header,
    "v-empyt": Empyt
  },
  methods: {
    async cancelOrder(item) {
      const data = {
        order_no: item.orderNo
      };
      const res = await this.$axios.cancelOrder(data);
      if (res.status === "20000") {
        this.orderList(this.selected);
      }
    },
    async orderList(status) {
      const data = {
        status: "",
        page: 1,
        list_rows: 99
      };
      const res = await this.$axios.orderList(data);
      if (res.status === "20000") {
        this.listAll = res.data.list;
        this.selectedFun(status);
      }
    },
    payOrder(item) {
      localStorage.order_no = item.orderNo;
      localStorage.price = item.finalPrice;
      this.$router.push("/payView");
    },
    gotoMyorderDetail(item) {
      this.$router.push(`/myorder/detail/${item.orderNo}`);
    },

    selectedFun(val) {
      let list = [];
      if (val == "") {
        list = this.listAll;
      } else if (val == 5) {
        list = this.listAll.filter(res => {
          const bool = [6, 7, 8, 9].includes(res.orderStatus);
          return bool;
        });
      } else {
        list = this.listAll.filter(res => {
          return res.orderStatus == val;
        });
      }
      this.list = [...list];
    }
  },
  mounted() {
    this.selected = this.$route.params.type;
    if (this.selected === "0") {
      this.selected = "";
    }
    this.orderList(this.selected);
  },
  watch: {
    selected(val) {
      this.selectedFun(val);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  /deep/ .is-selected {
    color: #9b9b9b;
    border-color: #9b9b9b;
  }
  /deep/ .mint-navbar {
    margin-bottom: 4px;
  }
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    padding: 0 30px;
    .list {
      padding-top: 10px;
      font-size: 12px;
      border-bottom: 1px solid #9b9b9b;
      padding-bottom: 10px;
      & > div {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      &-color {
        color: #9b9b9b;
      }
      &-image {
        width: 135px;
        height: 135px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-detail {
        div {
          margin-bottom: 8px;
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