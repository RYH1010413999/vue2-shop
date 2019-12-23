<template>
  <div class="login">
    <v-header></v-header>
    <div class="login-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">注册</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="2">
          <div class="list">
            <div>
              <input type="number" placeholder="手机号码" v-model="registerForm.mobile" />
            </div>
            <div v-if="showSendCode" @click="sendCode">发送验证码</div>
            <div v-else>{{number}}</div>
          </div>
          <div class="list-basic">
            <div>
              <input type="number" placeholder="验证码" v-model="registerForm.register_code" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="密码" v-model="registerForm.password" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="确认密码" v-model="registerForm.second_password" />
            </div>
          </div>
          <div class="submit" @click="register">注册并绑定微信</div>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <div class="list-basic">
            <div>
              <input type="number" placeholder="手机号" v-model="loginForm.mobile" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="密码" v-model="loginForm.password" />
            </div>
          </div>
          <div class="submit" @click="login">登录并绑定微信</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_headerHome.vue";
import { Toast } from "mint-ui";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      selected: "1",
      showSendCode: true,
      number: 59,
      registerForm: {
        password: "",
        second_password: "",
        mobile: "",
        register_code: "",
        openid: localStorage.openId
      },
      loginForm: {
        mobile: "",
        password: "",
        openid: localStorage.openId
      }
    };
  },
  methods: {
    /** 注册 */
    async register() {
      const data = this.registerForm;
      console.log(data);
      const res = await this.$axios.register(data);
      if (res.status === "20000") {
        Toast("注册成功");
        localStorage.login = true;
        localStorage.userInfo = JSON.stringify(res.data);
        this.$router.go(-1);
      } else {
        Toast(res.msg);
      }
    },

    /** 发送验证码 */
    async sendCode() {
      const data = {
        mobile: this.registerForm.mobile
      };
      const res = await this.$axios.sendRegisterCode(data);
      this.showSendCode = false;
      const clearSettime = setInterval(() => {
        this.number--;
        if (this.number === 0) {
          clearInterval(clearSettime);
          this.showSendCode = true;
        }
      }, 1000);
    },

    /** 登录 */
    async login() {
      if (this.loginForm.mobile !== "" && this.loginForm.password !== "") {
        const data = {
          mobile: this.loginForm.mobile,
          password: this.loginForm.password
        };
        const res = await this.$axios.register(data);
        if (res.status === "20000") {
          Toast("登录成功");
          localStorage.login = true;
          localStorage.userInfo = JSON.stringify(res.data);
          this.$router.go(-1);
        } else {
          Toast(res.msg);
        }
      } else {
        Toast("账号密码不能为空");
      }
    },

    wxLogin() {},

    //退出登录按钮
    logout() {
      Toast("退出登录成功,清除token");
      this.$store.commit("CHANGE_TOKEN", 0);
      this.toggle = true;
      this.account = "";
      this.password = "";
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  &-content {
    width: 100%;
    padding: 0 30px;
    & .list {
      width: 100%;
      height: 50px;
      display: flex;
      font-size: 12px;
      align-items: flex-end;
      justify-content: space-between;
      & > div:first-child {
        width: 100%;
        border-bottom: 1px solid #9b9b9b;
      }
      & > div:last-child {
        border: 1px solid #000000;
        width: 101px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        margin-left: 5px;
      }
    }
    & .list-basic {
      width: 100%;
      height: 50px;
      display: flex;
      font-size: 14px;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #9b9b9b;
      & > div{
        width: 100%;
      }
    }
  }
  & /deep/ .mint-navbar {
    width: 90px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    & > .mint-tab-item {
      font-size: 15px;
      color: #9b9b9b;
      width: 35px;
      height: 30px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .mint-tab-item-label {
        height: 100%;
        line-height: 30px;
      }
    }
    & > .is-selected {
      color: #000000;
      border-bottom: 1px solid black;
      .mint-tab-item-label {
        font-size: 17px;
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
input {
  width: 100%;
  font-size: 14px;
}
</style>
