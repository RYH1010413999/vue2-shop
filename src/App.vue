<template>
  <div id="app">
    <router-view></router-view>
    <v-loading v-show="fetchLoading"></v-loading>
  </div>
</template>

<script>
import Loading from "@/common/_loading";
export default {
  components: {
    "v-loading": Loading
  },
  computed: {
    fetchLoading() {
      return this.$store.state.detail.fetchLoading;
    }
  },
  methods: {
    GetQueryValue(queryName) {
      const query = decodeURI(window.location.search);
      const vars = query.split("?");
      console.log(vars);
      for (let i = 1; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == queryName) {
          return pair[1];
        }
      }
      return false;
    },
    wxLogin() {
      const config = {
        appid: "wx1f7e703a59621fce",
        redirect_uri: encodeURIComponent("http://www.horus1924.com"),
        code: "code",
        snsapi_userinfo: "snsapi_userinfo",
        state: "login"
      };
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appid}&redirect_uri=${config.redirect_uri}&response_type=${config.code}&scope=${config.snsapi_userinfo}&state=${config.state}#wechat_redirect`;
    }
  },
  async mounted() {
    const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
      return;
    }
    if (localStorage.openId) {
      return;
    }
    const code = this.GetQueryValue("code");
    if (code) {
      const res = await this.$axios.wechatOauth({
        code: code
      });
      console.log(res);
      if (res.status === "30303" || res.status === "30304") {
        localStorage.openId = res.data.openid;
      }
    } else {
      this.wxLogin();
    }
  }
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: #fff;
  color: black;
}
div,
body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button,
fieldset,
img,
input {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
li {
  background-color: #ffffff;
}
ol,
ul {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}

input,
select {
  vertical-align: middle;
}

input,
select,
textarea {
  font-size: 12px;
  margin: 0;
}
textarea {
  resize: none;
}

/*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
  border-collapse: collapse;
}
//去斜体
i {
  font-style: normal;
}
body {
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  color: #666;
  background: #fff;
}

a {
  color: #666;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
}

.ac {
  text-align: center;
}
</style>
