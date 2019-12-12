<template lang="html">
    <div class="product-list">
        <ul>
            <template v-for="k in classificationData">
                <li>
                    <router-link :to="{ path: '/search/category/'+k.id}">
                        <img :src="k.image">
                    </router-link>
                </li>
            </template>  
        </ul>

    </div>
</template>

<script>
export default {
  data() {
    return {
      classificationData: []
    };
  },
  async created() {
    const category = await this.$axios.category({});
    if (category.status === "20000") {
      this.classificationData = category.data;
    }
  }
};
</script>

<style lang="less" scoped>
.product-list {
  padding: 50px 70px;
  padding-bottom: 5px;
  overflow: hidden;
  li {
    float: left;
    width: 50%;
    text-align: center;
    margin-bottom: 20px;
    height: 110px;
  }
  img {
    width: 98px;
    height: auto;
  }
}
</style>