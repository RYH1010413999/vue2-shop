<template>
  <div class="main">
    <v-header></v-header>
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id @click="orderList()">全部</mt-tab-item>
        <mt-tab-item id="1" @click="orderList()">待支付</mt-tab-item>
        <mt-tab-item id="2" @click="orderList()">待发货</mt-tab-item>
        <mt-tab-item id="3" @click="orderList()">待收货</mt-tab-item>
        <mt-tab-item id="4" @click="orderList()">已完成</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id>
          <div class="list" v-for="(item,index) in list" :key="index">
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
                <div @click="cancelOrder(item)">取消订单</div>
                <div @click="payOrder(item)">立即支付</div>
              </div>
            </template>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <template v-for="(item,index) in list">
            <div class="list" :key="index" v-if="item.orderStatus === 1">
              <div>
                <div class="list-color">订单编号：{{item.orderNo}}</div>
                <div>{{item.orderStatus | Status}}</div>
              </div>

              <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
              </div>-->
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

              <div class="list-pay">
                <div @click="cancelOrder(item)">取消订单</div>
                <div @click="payOrder(item)">立即支付</div>
              </div>
            </div>
          </template>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <template v-for="(item,index) in list">
            <div class="list" :key="index" v-if="item.orderStatus === 2">
              <div>
                <div class="list-color">订单编号：{{item.orderNo}}</div>
                <div>{{item.orderStatus | Status}}</div>
              </div>

              <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
              </div>-->
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
            </div>
          </template>
        </mt-tab-container-item>

        <mt-tab-container-item id="3">
          <template v-for="(item,index) in list">
            <div class="list" :key="index" v-if="item.orderStatus === 3">
              <div>
                <div class="list-color">订单编号：{{item.orderNo}}</div>
                <div>{{item.orderStatus | Status}}</div>
              </div>

              <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
              </div>-->
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
            </div>
          </template>
        </mt-tab-container-item>

        <mt-tab-container-item id="4">
          <template v-for="(item,index) in list">
            <div class="list" :key="index" v-if="item.orderStatus === 4">
              <div>
                <div class="list-color">订单编号：{{item.orderNo}}</div>
                <div>{{item.orderStatus | Status}}</div>
              </div>

              <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
              </div>-->
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
            </div>
          </template>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      selected: "1",
      list: []
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
    "v-header": Header
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
        status: this.selected,
        page: 1,
        list_rows: 99
      };
      const res = await this.$axios.orderList(data);
      if (res.status === "20000") {
        this.list = res.data.list;
      }
    },
    payOrder(item) {
      localStorage.order_no = item.orderNo;
      localStorage.price = item.finalPrice;
      this.$router.push("/payView");
    }
  },
  mounted() {
    this.selected = this.$route.params.type;
    if (this.selected === "0") {
      this.selected = "";
    }
    this.orderList();
  }
};
</script>

<style lang="less" scoped>
.main {
  /deep/ .is-selected {
    color: #9b9b9b;
    border-color: #9b9b9b;
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