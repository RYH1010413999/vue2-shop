<template>
  <div>
    <v-header />
    <div class="content">
      <div>支付成功</div>
      <div>订单编号：000000</div>
    </div>
    <div class="end" @click="goto('首页')">< 返回首页</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    }
  }
};
</script>

<style lang="less" scoped>
.end {
  font-size: 14px;
  color: #9b9b9b;
  width: 73px;
  height: 20px;
  margin: 0 auto;
  border-bottom: 1px solid #9b9b9b;
  margin-top: 40px;
}
.content {
  font-size: 16px;
  text-align: center;
  border-top: 1px solid #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
  width: 310px;
  height: 140px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>