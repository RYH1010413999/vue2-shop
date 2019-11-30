<template>
  <div class="main">
    <v-header></v-header>
    <div class="all">
      <div class="list">
        <div class="list-left"></div>
        <div class="list-conter">
          <div>
            <span style="font-size:14px;">陈陈陈</span> 13927471827
          </div>
          <div>上海市 上海 长宁区 AAAAAAA</div>
          <div>默认</div>
        </div>
        <div>
          <img src="../../assets/image/delete.png" alt />
          <img @click="edit()" src="../../assets/image/edit.png" alt />
        </div>
      </div>
    </div>
    <div class="save" @click="add()">添加新地址</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods:{
    edit() {
      this.$router.push("/address");
    },
    add() {
      this.$router.push("/address");
    },
    // del() {}
  },
  components: {
    "v-header": Header
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  .all {
    width: 100%;
    padding: 0 30px;
    margin-top: 35px;
    .list {
      height: 90px;
      border-top: 1px solid #9b9b9b;
      font-size: 12px;
      display: flex;
      padding: 10px;
      justify-content: space-between;
      & > div:nth-child(1) {
        border: 2px solid #9b9b9b;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-top: 4px;
      }
      & > div:nth-child(2) {
        & > div {
          margin-bottom: 5px;
        }
        & > div:last-child {
          width: 37px;
          height: 17px;
          color: #9b9b9b;
          border: 1px solid #9b9b9b;
          text-align: center;
          line-height: 17px;
        }
      }
      & > div:nth-child(3) {
        & > img:first-child {
          margin-right: 10px;
        }
      }
    }
    .list:last-child {
      border-bottom: 1px solid #9b9b9b;
    }
  }
}
.save {
  background: #000000;
  width: 311px;
  height: 42px;
  font-size: 14px;
  color: #f2f2f2;
  margin: 0 auto;
  text-align: center;
  line-height: 42px;
  margin-top: 23px;
}
</style>