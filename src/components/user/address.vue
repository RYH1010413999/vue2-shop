<template>
  <div>
    <div @click="popupVisible=true">qqq</div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import city from "./city.js";
console.log(city);
export default {
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
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
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "left"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [
            "2015-01",
            "2015-02",
            "2015-03",
            "2015-04",
            "2015-05",
            "2015-06"
          ],
          className: "slot3",
          textAlign: "left"
        }
      ],
      popupVisible: false
    };
  },
  mounted() {
    
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>