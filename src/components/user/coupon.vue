<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-content">
      <template v-if="enableCoupon.length>0">
        <div class="main-content-title">优惠券</div>
        <template v-for="(item,index) in enableCoupon">
          <div class="main-content-list" :key="index">
            <div class="main-content-list-top">
              <div style="font-size: 14px;color:black;">¥ {{item.couponPrice}}</div>
              <div @click="gotoSearch">去使用 ></div>
            </div>
            <div>
              <div>满{{item.fillPrice}}使用</div>
              <div>{{item.receivedAt | date}} - {{item.maturityAt | date}}</div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <v-empyt></v-empyt>
      </template>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import Empyt from "@/common/_empty.vue";
export default {
  data() {
    return {
      enableCoupon: {}
    };
  },
  components: {
    "v-header": Header,
    "v-empyt": Empyt
  },
  methods: {
    gotoDetail() {
      this.$router.push({ name: "详情页" });
    },
    async couponList() {
      const res = await this.$axios.couponList({});
      this.enableCoupon = res.data.enableCoupon;
    },
    gotoSearch() {
      this.$router.push(`/search/all/0`);
    }
  },
  filters: {
    date: function(value) {
      return value.substring(0, 10);
    }
  },
  mounted() {
    this.couponList();
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  &-content {
    width: 100%;
    padding: 10px 30px;
    font-size: 14px;
    &-title {
      border-bottom: 1px solid #9b9b9b;
      height: 25px;
    }
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