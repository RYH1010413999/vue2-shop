<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-content">
      <div class="list-basic">
        <div>
          <input type="password" placeholder="密码" v-model="form.password" />
        </div>
      </div>
      <div class="list-basic">
        <div>
          <input type="password" placeholder="确认密码" v-model="form.second_password" />
        </div>
      </div>
      <div class="submit" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      form: {
        password: "",
        second_password: ""
      }
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    async save() {
      if (this.form.password === "" || this.form.second_password === "") {
        Toast("密码为空");
        return;
      }
      const data = this.form;
      const res = await this.$axios.changePassword(data);
      if (res.status === "20000") {
        Toast("修改成功");
        history.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  &-content {
    width: 100%;
    padding: 0 30px;
    & .list-basic {
      width: 100%;
      height: 50px;
      display: flex;
      font-size: 14px;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #9b9b9b;
      & > div {
        width: 100%;
      }
    }
  }
}
.submit {
  background: #000000;
  width: 100%;
  height: 42px;
  font-size: 14px;
  color: #f2f2f2;
  margin: 0 auto;
  text-align: center;
  line-height: 42px;
  margin-top: 25px;
}
</style>