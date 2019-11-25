<template lang="html">
  <section class="chose">
    <div class="chose-view">
      <h1 class="chose-view-title">
        Planet-戒指
      </h1>
      <div class="chose-view-price">¥ 5，000元</div>
      <div class="chose-view-model">
        <div class="chose-view-model-name">
          <div>型号：00000000</div>
          <div>
            <img src="../../assets/image/like.png" alt="">
            <img src="../../assets/image/share.png" alt="">
          </div>
        </div>
        <div class="chose-view-model-detail">
          细节描述：18K金，宝石
        </div>
        <div class="chose-view-model-select">
          <div>选择尺寸：</div>
          <div>尺寸帮助？</div>
        </div>
        <div class="chose-view-model-select-number">
          <div style="text-align: center;margin-bottom: 10px;">{{rangeValue}}</div>
          <mt-range v-model="rangeValue" :min="40" :max="60" :step="1" :bar-height="2">
            <div slot="start" class="left">40</div>
            <div slot="end" class="left">60</div>
          </mt-range>
        </div>
        <div class="chose-view-model-careful">
          <div>
            <div>使用注意</div>
            <img src="../../assets/image/add.png" alt="">
          </div>
          <div>
            <div>销售条款</div>
            <img src="../../assets/image/add.png" alt="">
          </div>
        </div>
        <div class="chose-view-model-end">
    <img src="../../assets/image/logo_center.png" alt="">
        </div>
      </div>
    </div>

  </section>


</template>

<script>
  import { MessageBox } from "mint-ui";
  import { mapState } from "vuex";

  export default {
    data() {
      return {
        rangeValue: 55
      };
    },
    computed: mapState({}),
    methods: {}
  };
</script>

<style lang="less" scoped>
  @import "../../assets/fz.less";

  .chose {
    .chose-view {
      width: 312px;
      margin: 0 auto;

      &-title {
        text-align: center;
        font-size: 17px;
        margin-top: 20px;
        margin-bottom: 5px;
      }

      &-price {
        text-align: center;
        font-size: 17px;
        color: #d00202;
      }

      &-model {
        margin-top: 20px;

        &-name {
          font-size: 12px;
          color: #9b9b9b;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #000000;
          height: 30px;
          align-items: flex-end;
          padding-bottom: 8px;

          &>div:last-child {
            display: flex;
            align-items: center;

            &>img:first-child {
              width: 19px;
              height: 18px;
              margin-right: 22px;
            }

            &>img:last-child {
              width: 20px;
              height: 19px;
            }
          }
        }

        &-detail {
          height: 26px;
          font-size: 12px;
          line-height: 26px;
        }

        &-select {
          font-size: 12px;
          display: flex;
          justify-content: space-between;

          &>div:last-child {
            color: #9b9b9b;
            border-bottom: 1px solid #9b9b9b;
            text-align: center;
          }
        }

        &-select-number {
          width: 100%;
          height: 100px;
          font-size: 14px;
          padding-top: 30px;

          & .left {
            padding: 0 5px;
            color: #9b9b9b;
            font-size: 12px;

          }
        }

        &-careful {
          width: 100%;
          margin-top:20px;
          & >div{
            border-bottom: 1px solid #9b9b9b;
            display: flex;
            justify-content:space-between;
            height:20px;
            margin-bottom:30px;
            &>img{
              width:10px;
              height:10px;
            }
          }
        }

        &-end{
          display: flex;
          justify-content: center;
          padding:20px;
          &>img{
            width: 38px;
            height: 24px;
          }
        }
      }
    }
  }
</style>