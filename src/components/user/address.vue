<template>
  <div class="main">
    <v-header>
    </v-header>
    <div @click="popupVisible=true">点击</div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" valueKey="label">
        <div class="tool-bar">
          <div>取消</div>
          <div>确定</div>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import city from "./city.js";
import Header from "@/common/_header.vue";
export default {
  data() {
    return {
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
      popupVisible: false
    };
  },
  mounted() {},
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
</style>