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
          <div class="submit" @click="register">注册</div>
        </mt-tab-container-item>

        <mt-tab-container-item id="1">
          <!-- 密码登录 -->
          <template v-if="paswordLogin">
            <div class="list-basic">
              <div>
                <input type="number" placeholder="手机号码" v-model="loginForm.mobile" />
              </div>
            </div>
            <div class="list-basic">
              <div>
                <input type="password" placeholder="密码" v-model="loginForm.password" />
              </div>
            </div>
          </template>

          <!-- 验证码登录 -->
          <template v-if="!paswordLogin">
            <div class="list">
              <div>
                <input type="number" placeholder="手机号码" v-model="codeForm.mobile" />
              </div>
              <div v-if="showSendCode2" @click="sendCodelogin">发送验证码</div>
              <div v-else>{{number2}}</div>
            </div>
            <div class="list-basic">
              <div>
                <input type="number" placeholder="验证码" v-model="codeForm.login_code" />
              </div>
            </div>
          </template>
          <div
            class="logincheck"
            @click="paswordLogin = !paswordLogin"
          >{{paswordLogin?'验证码登录':'密码登录'}}</div>
          <div class="submit" @click="login">登录</div>
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
      paswordLogin: true,
      selected: "1",
      showSendCode: true,
      showSendCode2: true,
      wxBrowser: false,
      number: 59,
      number2: 59,
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
      },
      codeForm: {
        mobile: "",
        login_code: "",
        openid: localStorage.openId
      }
    };
  },
  methods: {
    /** 注册 */
    async register() {
      const data = this.registerForm;
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

    /** 发送注册验证码 */
    async sendCode() {
      if (this.registerForm.mobile === "") {
        Toast("手机号为空！");
        return;
      }
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

    /** 发送登录验证码 */
    async sendCodelogin() {
      if (this.codeForm.mobile === "") {
        Toast("手机号为空！");
        return;
      }
      const data = {
        mobile: this.codeForm.mobile
      };
      const res = await this.$axios.sendLoginCode(data);
      this.showSendCode2 = false;
      const clearSettime = setInterval(() => {
        this.number2--;
        if (this.number2 === 0) {
          clearInterval(clearSettime);
          this.showSendCode2 = true;
        }
      }, 1000);
    },

    /** 登录 */
    async login() {
      let data;
      if (this.paswordLogin) {
        if (this.loginForm.mobile === "" || this.loginForm.password === "") {
          Toast("账号密码不能为空");
          return;
        }
        data = this.loginForm;
      } else {
        if (this.codeForm.mobile === "") {
          Toast("手机号为空！");
          return;
        }
        data = this.codeForm;
      }
      const res = await this.$axios.register(data);
      if (res.status === "20000") {
        Toast("登录成功");
        localStorage.login = true;
        localStorage.userInfo = JSON.stringify(res.data);
        this.$router.go(-1);
      } else {
        Toast(res.msg);
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
  },
  mounted() {
    const ua = navigator.userAgent.toLowerCase();
    this.wxBrowser = ua.includes('micromessenger');
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
      & > div {
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
.logincheck {
  text-align: right;
  margin-top: 10px;
}
</style>
