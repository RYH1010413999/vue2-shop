<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header></v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something v-if="true"/>
      <v-footer/>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import Something from '@/components/car/something.vue'
import Footer from '@/components/car/footer.vue'
import { mapState } from 'vuex'
export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer
  },

  computed:{
    ...mapState({
      number: state => state.car.number,
      money: state => state.car.money
    })
  },
  mounted(){
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
