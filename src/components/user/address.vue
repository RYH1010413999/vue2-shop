<template>
  <div class="main">
    <v-header></v-header>
    <div class="content">
      <div class="content-list">
        <input type="text" placeholder="收货人" v-model="receiver" />
      </div>
      <div class="content-list">
        <input type="text" placeholder="手机号" v-model="mobile" />
      </div>
      <div class="content-list" @click="popupVisible=true" style="justify-content: space-between;">
        <div>{{province}}</div>
        <img src="../../assets/image/back.png" alt />
      </div>
      <div class="content-list">
        <input type="text" placeholder="详细地址" v-model="address_detail" />
      </div>
    </div>
    <div class="default">
      <mt-checklist v-model="value" :options="['设为默认地址']"></mt-checklist>
    </div>
    <div class="save" @click="save">保存</div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" valueKey="label">
        <div class="tool-bar">
          <div @click="popupVisible=false">取消</div>
          <div @click="popupVisible=false">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import city from "./city.js";
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      value: [],
      slots: [
        {
          flex: 1,
          values: city.city,
          className: "slot1",
          textAlign: "center"
        },

        {
          divider: true,
          content: "",
          className: "slot2"
        },

        {
          flex: 1,
          values: [
            {
              value: "110101",
              label: "北京市"
            },
            {
              value: "110200",
              label: "北京市辖县"
            }
          ],
          className: "slot3",
          textAlign: "center",
          defaultIndex: 0
        },

        {
          divider: true,
          content: "",
          className: "slot4"
        },

        {
          flex: 1,
          values: [
            {
              value: "110101",
              label: "东城区"
            },
            {
              value: "110102",
              label: "西城区"
            },
            {
              value: "110105",
              label: "朝阳区"
            },
            {
              value: "110106",
              label: "丰台区"
            },
            {
              value: "110107",
              label: "石景山区"
            },
            {
              value: "110108",
              label: "海淀区"
            },
            {
              value: "110109",
              label: "门头沟区"
            },
            {
              value: "110111",
              label: "房山区"
            },
            {
              value: "110112",
              label: "通州区"
            },
            {
              value: "110113",
              label: "顺义区"
            },
            {
              value: "110114",
              label: "昌平区"
            },
            {
              value: "110115",
              label: "大兴区"
            },
            {
              value: "110116",
              label: "怀柔区"
            },
            {
              value: "110117",
              label: "平谷区"
            }
          ],
          className: "slot5",
          textAlign: "center"
        }
      ],
      popupVisible: false,

      receiver: "",
      mobile: "",
      province: "",
      address_detail: ""
    };
  },
  mounted() {
    if (this.$route.params.type === "edit") {
      const item = JSON.parse(localStorage.addressinfo);
      this.receiver = item.receiver;
      this.mobile = item.mobile;
      this.is_default = item.is_default
      // this.province = `${item.province} - ${item.city} - ${item.area}`;
      this.address_detail = item.address_detail;
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0]) {
        this.slots[2].values = values[0].children;
        this.slots[4].values = values[1].children;
      } else {
        values[0] = this.slots[0].values[0];
        values[1] = this.slots[0].values[0].children[0];
        values[2] = this.slots[0].values[0].children[0].children[0];
      }
      this.province = `${picker.values[0].label}-${picker.values[1].label}-${picker.values[2].label}`;
    },
    async save() {
      const address = this.province.split("-");
      console.log(address)
      const data = {
        receiver: this.receiver,
        mobile: this.mobile,
        province: address[0],
        city: address[1],
        area: address[2],
        address_detail: this.address_detail,
        is_default: this.value
      };
      if (this.$route.params.type === "edit") {
        const res = await this.$axios.editAddress(`personal/address/${JSON.parse(localStorage.addressinfo).id}/modify/`,data);
        if (res.status === "20000") {
          Toast("保存成功");
          this.$router.go(-1);
        }
      } else {
        const res = await this.$axios.addressCreate(data);
        if (res.status === "20000") {
          Toast("创建成功");
          this.$router.go(-1);
        }
      }
    }
  },
  components: {
    "v-header": Header
  }
};
</script>

<style lang="less" scoped>
.mint-popup {
  width: 100%;
}
.main /deep/ .picker-item {
  font-size: 14px;
}
.tool-bar {
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
  justify-content: center;
  & > div:first-child {
    margin-right: 120px;
    color: #9b9b9b;
  }
}

.content {
  width: 100%;
  padding: 0 30px;
  &-list {
    width: 100%;
    border-bottom: 1px solid #9b9b9b;
    height: 50px;
    padding-bottom: 5px;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    input {
      width: 100%;
    }
    img {
      width: 20px;
      height: 20px;
      transform: rotate(-90deg);
    }
  }
}

.default {
  width: 100%;
  padding: 0 30px;
  /deep/ .mint-checklist {
    &-title {
      display: none;
    }
    .mint-cell {
      background: none;
      .mint-cell-wrapper {
        padding: 0;
        font-size: 12px;
        color: #9b9b9b;
        .mint-checklist-label {
          padding: 0;
        }
        .mint-checklist-title {
          display: none;
        }
        .mint-checkbox-core {
          width: 11px;
          height: 11px;
        }
        .mint-checkbox-input:checked + .mint-checkbox-core {
          background-color: #9b9b9b;
          border-color: #9b9b9b;
        }
        .mint-checkbox-core::after {
          display: none;
        }
      }
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
  margin-top: 10px;
}
</style>