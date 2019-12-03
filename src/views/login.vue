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
        <mt-tab-container-item id="1">
          <div class="list">
            <div>
              <input type="number" placeholder="手机号码" />
            </div>
            <div>发送验证码</div>
          </div>
          <div class="list-basic">
            <div>
              <input type="number" placeholder="验证码" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="密码" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="确认密码" />
            </div>
          </div>
          <div class="submit" @click="wxLogin">注册并绑定微信</div>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <div class="list-basic">
            <div>
              <input type="number" placeholder="手机号" />
            </div>
          </div>
          <div class="list-basic">
            <div>
              <input type="password" placeholder="密码" />
            </div>
          </div>
          <div class="submit" @click="wxLogin">登录并绑定微信</div>
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
      account: "",
      password: "",
      toggle: !this.$store.state.login.token
    };
  },
  methods: {
    // 登录按钮
    login() {
      if (this.account !== "" && this.password !== "") {
        Toast("登录成功,存储token,跳转网页");
        this.toggle = false;
        this.$store.commit("CHANGE_TOKEN", 1);
      } else {
        Toast("账号密码不能为空");
      }

      setTimeout(() => {
        this.$router.replace({
          path: "user"
        });
      }, 1000);
      // 登录成
    },

    wxLogin() {
      const config = {
        appid: "wx1f7e703a59621fce",
        redirect_uri: encodeURIComponent("http://www.horus1924.com"),
        code: "code"
      };
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${config.redirect_uri}&response_type=${config.code}&scope=${config.snsapi_userinfo}&state=STATE#wechat_redirect`;
    },

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
      font-size: 12px;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #9b9b9b;
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
</style>
