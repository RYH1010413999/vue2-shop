<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <p>共{{number}}件 金额：</p>
      <p><span>{{money}} </span>元</p>
    </div>
    <router-link :to="{ path: '/search/all/0'}" class="footer-goon" >
      继续购物
    </router-link>
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      number: state => state.car.number,
      money: state => state.car.money
    })
  },

  methods: {
    //点击跳转到支付页
    goPay() {
      if(this.money === 0){
        alert("请选择结算商品！")
        return;
      }
      this.$router.push(`/confirm/order`);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

.footer {
  width: 100%;
  height: 16vw;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  .footer-result,
  a {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
  }

  .footer-result {
    p {
      .fz(font-size, 24);
      color: #999;
    }

    p:last-of-type {
      padding: 1vw 0 0 1vw;
      span {
        color: @cl;
        .fz(font-size, 42);
      }
    }
  }

  .footer-goon {
    background-color: #f4f4f4;
    line-height: 16vw;
  }

  .footer-pay {
    background-color: @cl;
    line-height: 16vw;
    color: #fff;
  }
}
</style>
