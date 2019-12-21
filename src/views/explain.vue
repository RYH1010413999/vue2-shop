<template>
  <div>
    <v-header />
    <div class="content">
      <div class="content-div" v-if="type === '1'">
        <div class="content-div-main">
          <div class="content-div-main-title">关于我们</div>
          <div class="content-div-main-p">
            <p>温柔是一种力量，光芒亦蕴含温度，在璀璨辰星中，引你与代号Horus1924行星相遇，让这颗星球在你的心中柔软着陆，为你心头带来一次怦然的震撼。</p>
            <p>
              在Horus1924，每一款设计都有自己独属的吸引力，温和而光亮，点缀着平凡或特殊的日子，
              不可抗拒却又温润恒久。我们相信自我才是答案，在多面的生活里我们和每一个自己融洽相处，创造不同的可能和希望。
            </p>
          </div>
          <!-- <div class="content-div-main-title">Horus Club</div> -->
          <div class="content-div-main-title">关于保养维修等售后服务</div>
          <div class="content-div-main-p">
            <p>
              *
              售出产品在非人为损坏的情况下，由于自然氧化造成的镀金脱色在货品签收后三个月内提供免费镀色。其他非人为损坏，珍珠宝石等装饰物脱落但未丢失的情况下，自货品签收日起提供六个月免费保修。超出六个月免费保修期后，若产品出现损坏视情况收费维修。
            </p>
            <p>
              *
              售出产品在没有人为损坏且不影响二次销售（包含配件、产品配套包装完整无损，且货品未被修改拆解）的情况下，可于7天内退换货。具体退换流程请联系客服。非质量问题退换货，买家自行承担运费（包含但不限于：戒指尺码调换等退货原因）。
            </p>
            <p>* 所售产品均为K金或925银材质，对以上材质过敏者，在佩戴过程中有可能会产生局部皮肤红肿或瘙痒等过敏反应，请谨慎购买。</p>
            <p>* 订制商品、打折商品不接受退换货。</p>
            <p>* 建议使用顺丰退件，退件途中若有任何遗失或损坏请自行承担。</p>
          </div>
          <div class="content-div-main-title">关于首次购买者如何确定戒指尺寸</div>
          <div class="content-div-main-p">
            <p>为得知最准确的尺寸，您可使用我们每次随产品附带的指圈测卡。若为首次购买消费者，您可去就近的珠宝商店测量，或者您也可以在家用一条小绳子或小纸条，围绕手指最粗的部位拉测测量做一个记号，然后测量出周长，再对应手寸号。</p>
          </div>
          <div class="tips">
            <p>测量小提示：</p>
            <p>冬天购买戒指，由于天气较冷，手指比夏天要细一号到半号。</p>
            <p>宜在夜晚测量，因为那时您的手指尺寸最大。</p>
            <p>如果戒指大小在两个纸环之间，那么请您选择更大的那个。</p>
            <p>戒指以带上后可以左右旋转但不易脱落为宜，夏天则以带上后感觉稍紧为宜。</p>
            <p>人工测量方法存在一定误差，请您多次测量，取戒号出现最多的尺寸。</p>
          </div>
        </div>
      </div>

      <div class="content-div" v-if="type === '2'">
        <div class="content-div-title">销售条款</div>
        <div class="content-div-main">
          <p class="content-div-main-title">1. 关于首次购买者如何确定戒指尺寸</p>
          <p>为得知最准确的尺寸，您可使用我们每次随产品附带的指圈测卡。若为首次购买消费者，您可去就近的珠宝商店测量，或者您也可以在家用一条小绳子或小纸条，围绕手指最粗的部位拉测测量做一个记号，然后测量出周长，再对应手寸号。</p>
          <p>
            测量小提示：
            冬天购买戒指，由于天气较冷，手指比夏天要细一号到半号。
            宜在夜晚测量，因为那时您的手指尺寸最大。
            如果戒指大小在两个纸环之间，那么请您选择更大的那个。
            戒指以带上后可以左右旋转但不易脱落为宜，夏天则以带上后感觉稍紧为宜。
            人工测量方法存在一定误差，请您多次测量，取戒号出现最多的尺寸。
          </p>
          <p class="content-div-main-title">2. 关于售后服务</p>
          <p>
            售出产品在没有人为损坏且不影响二次销售（包含配件、产品配套包装完整无损，且货品未被修改拆解）的情况下，可于7天内退换货。具体退换流程请联系客服。非质量问题退换货，买家自行承担运费（包含但不限于：戒指尺码调换等退货原因）。
            所售产品均为K金或925银材质，对以上材质过敏者，在佩戴过程中有可能会产生局部皮肤红肿或瘙痒等过敏反应，请谨慎购买。
            订制商品、打折商品不接受退换货。
            建议使用顺丰退件，退件途中若有任何遗失或损坏请自行承担。
          </p>
          <p class="content-div-main-title">3. 关于保养维修服务</p>
          <p>售出产品在非人为损坏的情况下，由于自然氧化造成的镀金脱色在货品签收后三个月内提供免费镀色。其他非人为损坏，珍珠宝石等装饰物脱落但未丢失的情况下，自货品签收日起提供六个月免费保修。超出六个月免费保修期后，若产品出现损坏视情况收费维修。</p>
          <p class="content-div-main-title">4. 关于鉴定检验</p>
          <p>所售产品均为金银材质，搭配珍珠宝石等装饰物，按需提供国检出具的鉴定证书，鉴定费用需买家自行承担。</p>
          <p class="content-div-main-title">5. 关于物流运输</p>
          <p>
            单次购物满700元免运费。所有现货在付款后48小时内发货，预售或定制产品请参考页面预售发货时间，或联系客服。默认物流为顺丰，如有其他物流公司偏好，请在下单时联系客服。
            特别提醒：遇周末和法定节假日延后发货。若有特殊情况请联系客服。
          </p>
        </div>
      </div>

      <div class="content-div" v-if="type === '3'">
        <div class="content-div-title">关于首次购买者如何确定戒指尺寸</div>
        <div
          class="content-div-main"
        >为得知最准确的尺寸，您可使用我们每次随产品附带的指圈测卡。若为首次购买消费者，您可去就近的珠宝商店测量，或者您也可以在家用一条小绳子或小纸条，围绕手指最粗的部位拉测测量做一个记号，然后测量出周长，再对应手寸号。</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      type: "1"
    };
  },
  methods: {
    goto(path) {
      this.$router.push({ name: path });
    }
  },
  mounted() {
    this.type = this.$route.params.type;
  }
};
</script>

<style lang="less" scoped>
.content-div {
  padding: 0 30px;
  padding-bottom: 20px;

  &-main {
    line-height: 20px;
    font-size: 12px;
    color: #333333;

    &-title {
      font-size: 18px;
      margin: 10px 0;
      font-weight: bold;
      text-decoration: underline;
    }

    &-p {
      margin-bottom: 10px;
      p {
        margin: 5px 0;
      }
    }

    .tips {
      font-size: 10px;
      color: #9b9b9b;
    }
  }
}
</style>