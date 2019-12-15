<template>
  <div>
    <v-header />
    <div class="content">
     
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  data(){
    return{
    }
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    }
  },
  async mounted(){
    const res = await this.$axios.payCheck({})
  }
};
</script>

<style lang="less" scoped>

</style>