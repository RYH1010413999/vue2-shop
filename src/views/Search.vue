
<template>
  <div>
    <v-header></v-header>
    <div class="main">
      <!-- <div class="main-search">
        <img src="../assets/image/search.png" alt />
        <input type="text" placeholder="请输入搜索内容" />
      </div> -->
      <div class="main-banner">
        <div>Planet</div>
      </div>
      <div class="main-all">
        <template v-for="(item, i) in list">
          <div class="main-all-list" @click="gotoDetail(item.productSn)" v-bind:key="i">
            <!-- <img class="main-all-list-item1" src="../assets/image/like.png" alt /> -->
            <img class="main-all-list-item2" :src="item.headImageUrl" alt />
            <div class="main-all-list-item3">{{item.spectrum}}-{{item.title}}</div>
            <div class="main-all-list-item4">型号：{{item.productSn}}</div>
            <div
              class="main-all-list-item5"
              v-if="item.maxPrice === item.minPrice"
            >¥ {{item.maxPrice}}</div>
            <div class="main-all-list-item5" v-else>¥{{item.minPrice}} - ¥ {{item.maxPrice}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_headerHome.vue";
export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    gotoDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  async mounted() {
    if (this.$route.params.type === "all") {
      const data = {
        page: "1",
        list_rows: "99"
      };
      const res = await this.$axios.productsAll(data);
      if (res.status === "20000") {
        this.list = res.data.list;
      }
    }
    if (this.$route.params.type === "spectrum") {
      const data = {
        page: "1",
        list_rows: "99",
        spectrum: this.$route.params.id
      };
      const res = await this.$axios.productsSpectrum(data);
      if (res.status === "20000") {
        this.list = res.data.list;
      }
    }
    if (this.$route.params.type === "category") {
      const data = {
        page: "1",
        list_rows: "99",
        category: this.$route.params.id
      };
      const res = await this.$axios.productsCategory(data);
      if (res.status === "20000") {
        this.list = res.data.list;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  border-top: 1px solid #e0e0e0;
  &-search {
    width: 312px;
    height: 34px;
    background-color: #f2f2f2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin: 10px auto;

    & > img {
      width: 18px;
      height: 17px;
    }

    & > input {
      width: 100%;
      border-radius: 5px;
      height: 100%;
      margin-left: 25px;
      background-color: #f2f2f2;
      font-size: 11px;
      color: #9b9b9b;
    }
  }
  &-banner {
    width: 100%;
    height: 105px;
    background-image: url(../assets/image/commodityType4.png);
    background-repeat:no-repeat;
    background-size:100%;
    font-size: 15px;
    color: #ffffff;
    text-align: center;
    padding-top: 75px;
  }
  &-all {
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 10px;
    &-list {
      width: 182px;
      height: 294px;
      padding: 10px;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 5px;
      &-item1 {
        width: 20px;
        height: 20px;
        align-self: flex-end;
        margin-bottom: 7px;
      }
      &-item2 {
        width: 147px;
        height: 163px;
        float: right;
      }

      &-item3 {
        font-size: 14px;
        margin-top: 18px;
      }

      &-item4 {
        font-size: 10px;
        color: #9b9b9b;
        margin-top: 5px;
        margin-bottom: 3px;
      }

      &-item5 {
        font-size: 11px;
        color: #d00202;
      }
    }
  }
}
</style>
