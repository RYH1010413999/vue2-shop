<template>
  <div>
    <div @click="popupVisible=true">qqq</div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true" valueKey="label"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import city from "./city.js";
export default {
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: city.city,
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [
            {
              value: "110101",
              label: "北京市"
            }
          ],
          className: "slot3",
          textAlign: "left"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [
            {
              value: "110101",
              label: "东城区"
            }
          ],
          className: "slot5",
          textAlign: "left"
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
        if (values[1]) {
          this.slots[4].values = values[1].children;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>