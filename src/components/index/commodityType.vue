<template>
  <div class="product-list">
    <ul>
      <template v-for="(k,index) in commodityTypeData">
        <li :key="index">
          <router-link :to="{ name: '搜索页'}">
            <div class="list-img">
              <div>{{k.name}}</div>
              <img :src="k.imgPath" />
            </div>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    commodityTypeData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.product-list {
  overflow: hidden;
  li {
    float: left;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  .list-img {
    width: 100%;
    height: 200px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    div {
      position: absolute;
      font-size: 15px;
      color: #ffffff;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10px;
      font-family: PrestigeEliteStd-Bd;
      letter-spacing: 2px;
    }
  }
}
</style>