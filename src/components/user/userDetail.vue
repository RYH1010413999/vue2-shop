<template>
  <div class="main">
    <v-header></v-header>
    <div class="main-content">
      <div class="main-content-title">个人信息</div>
      <div class="main-content-all">
        <div class="main-content-all-list">
          <div>称呼</div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div class="main-content-all-list">
          <div>姓氏</div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div class="main-content-all-list">
          <div>名字</div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div class="main-content-all-list">
          <div>性别</div>
          <div>
            <div>女</div>
            <div>男</div>
          </div>
          <div @click="openPicker">生日 (选填)</div>
          <div>
            <div>{{pickerValue | date}}</div>
            <mt-datetime-picker
              ref="picker"
              type="date"
              v-model="pickerValue"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              :startDate="startDate"
              :endDate="endDate"
            ></mt-datetime-picker>
          </div>
        </div>

        <div class="main-content-all-list">
          <div>手机</div>
          <div>
            <div>
              <input type="text" />
            </div>
            <div>发送验证码</div>
          </div>
          <div>
            <input type="text" placeholder="验证码" />
          </div>
        </div>

        <div class="main-content-all-list">
          <div>密码</div>
          <div>
            <input type="password" />
          </div>
        </div>

        <div class="main-content-all-list">
          <div>请输入8-20位数字，大小字母及符号的组合</div>
          <div>确认密码</div>
          <div>
            <input type="password" />
          </div>
        </div>
      </div>
      <div class="main-content-end">请输入8-20位数字，大小字母及符号的组合</div>
      <div class="main-content-save">保存</div>
    </div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
      pickerValue: new Date(),
      startDate: new Date('1900','1','1'),
      endDate: new Date()
    };
  },
  components: {
    "v-header": Header
  },
  methods: {
    gotoDetail() {
      this.$router.push({ name: "详情页" });
    },
    openPicker() {
      this.$refs.picker.open();
    }
  },
  filters: {
    date: function(value) {
      const y = new Date(value).getFullYear();
      let m = new Date(value).getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = new Date(value).getDate();
      d = d < 10 ? "0" + d : d;
      return `${y}/${m}/${d}`;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  &-content {
    width: 100%;
    padding: 0 30px;
    &-title {
      font-size: 14px;
      border-bottom: 1px solid #9b9b9b;
      width: 100%;
      height: 38px;
    }
    &-all {
      width: 100%;
      &-list {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #9b9b9b;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 3px 0;
        & > div:first-child {
          font-size: 12px;
          color: #9b9b9b;
        }
        & > div:last-child {
          width: 100%;
          font-size: 14px;
        }
      }
      &-list:nth-child(4) {
        width: 100%;
        height: 93px;
        & > div:nth-child(1) {
          font-size: 12px;
          color: #9b9b9b;
        }
        & > div:nth-child(2) {
          display: flex;
          width: 100%;
          font-size: 14px;
          & > div {
            border: 1px solid #9b9b9b;
            width: 58px;
            height: 22px;
            margin-right: 14px;
            text-align: center;
          }
        }
        & > div:nth-child(3) {
          font-size: 12px;
          color: #9b9b9b;
        }
        & > div:nth-child(4) {
          height: 14px;
        }
      }

      &-list:nth-child(5) {
        width: 100%;
        height: 99px;
        & > div:nth-child(1) {
          font-size: 12px;
          color: #9b9b9b;
        }
        & > div:nth-child(2) {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 14px;
          & > div {
            border-bottom: 1px solid #9b9b9b;
          }
          & > div:nth-child(1) {
            width: 200px;
          }
          & > div:nth-child(2) {
            height: 24px;
            border: 1px solid #9b9b9b;
            width: 103px;
            text-align: center;
            line-height: 24px;
          }
        }
      }

      &-list:nth-child(7) {
        width: 100%;
        height: 75px;
        & > div:nth-child(1) {
          font-size: 12px;
          color: #9b9b9b;
        }
        & > div:nth-child(2) {
          font-size: 12px;
          color: #9b9b9b;
        }
      }
    }
    &-end {
      margin-top: 5px;
      font-size: 12px;
    }
    &-save {
      margin-top: 20px;
      background: #000000;
      width: 311px;
      height: 42px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      line-height: 42px;
    }
  }
}
</style>