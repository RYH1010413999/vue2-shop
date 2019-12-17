<template>
  <div class="main">
    <v-header></v-header>
    <div class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">全部</mt-tab-item>
        <mt-tab-item id="2">待支付</mt-tab-item>
        <mt-tab-item id="3">待发货</mt-tab-item>
        <mt-tab-item id="4">待收货</mt-tab-item>
        <mt-tab-item id="5">待评价</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="list" v-for="(item,index) in list" :key="index">
            <div>
              <div class="list-color">订单编号：{{item.orderNo}}</div>
              <div>{{item.orderStatus | Status}}</div>
            </div>
            <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>-->
            <div>
              <div class="list-image">
                <img :src="item.orderItem[0].imageUrl" alt />
              </div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ {{item.originPrice}} x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥{{item.policyPrice}}</div>
              <div>合计: ￥ {{item.finalPrice}}</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="list" v-for="(item,index) in list" :key="index" v-if="item.orderStatus === 1">
            <div>
              <div class="list-color">订单编号：{{item.orderNo}}</div>
              <div>{{item.orderStatus | Status}}</div>
            </div>
            <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>-->
            <div>
              <div class="list-image">
                <img :src="item.orderItem[0].imageUrl" alt />
              </div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ {{item.originPrice}} x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥{{item.policyPrice}}</div>
              <div>合计: ￥ {{item.finalPrice}}</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="list" v-for="(item,index) in list" :key="index" v-if="item.orderStatus === 2">
            <div>
              <div class="list-color">订单编号：{{item.orderNo}}</div>
              <div>{{item.orderStatus | Status}}</div>
            </div>
            <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>-->
            <div>
              <div class="list-image">
                <img :src="item.orderItem[0].imageUrl" alt />
              </div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ {{item.originPrice}} x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥{{item.policyPrice}}</div>
              <div>合计: ￥ {{item.finalPrice}}</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="list" v-for="(item,index) in list" :key="index" v-if="item.orderStatus === 3">
            <div>
              <div class="list-color">订单编号：{{item.orderNo}}</div>
              <div>{{item.orderStatus | Status}}</div>
            </div>
            <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>-->
            <div>
              <div class="list-image">
                <img :src="item.orderItem[0].imageUrl" alt />
              </div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ {{item.originPrice}} x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥{{item.policyPrice}}</div>
              <div>合计: ￥ {{item.finalPrice}}</div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <div class="list" v-for="(item,index) in list" :key="index" v-if="item.orderStatus === 4">
            <div>
              <div class="list-color">订单编号：{{item.orderNo}}</div>
              <div>{{item.orderStatus | Status}}</div>
            </div>
            <!-- <div>
              <div class="list-color">参考编码：2019112810293810248</div>
            </div>-->
            <div>
              <div class="list-image">
                <img :src="item.orderItem[0].imageUrl" alt />
              </div>
              <div class="list-detail">
                <div>Planet-戒指</div>
                <div>编号00000</div>
                <div>尺寸：53</div>
                <div>￥ {{item.originPrice}} x 1</div>
              </div>
            </div>
            <div>
              <div>共计1件商品，运费￥{{item.policyPrice}}</div>
              <div>合计: ￥ {{item.finalPrice}}</div>
            </div>
          </div>
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
          data = '待下单'
          break;
        case 1:
          data = '待支付'
          break;
        case 2:
          data = '待发货'
          break;
        case 3:
          data = '待收货'
          break;
        case 4:
          data = '待评价'
          break;
        case 5:
          data = '已评价'
          break;
          case 6:
          data = '售后处理中'
          break;
          case 7:
          data = '退货换货'
          break;
          case 8:
          data = '退货退款'
          break;
          case 9:
          data = '退款不退货'
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
  async mounted() {
    this.selected = this.$route.params.type;
    const res = await this.$axios.orderList({});
    if (res.status === "20000") {
      this.list = res.data.list;
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
    }
  }
}
</style>