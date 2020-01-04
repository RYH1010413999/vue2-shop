<template>
  <div class="main">
    <v-header></v-header>
    <div class="all">
      <template v-if="list.length>0">
        <div class="list" v-for="(item,index) in list" :key="index" @click="localAddress(item)">
          <div class="list-left"></div>
          <div class="list-conter">
            <div>
              <span style="font-size:14px;">{{item.receiver}}</span>
              {{item.mobile}}
            </div>
            <div>{{item.province}} {{item.city}} {{item.area}}</div>
            <div>{{item.address_detail}}</div>
            <div class="default" v-if="item.is_default">默认</div>
          </div>
          <div>
            <img src="../../assets/image/delete.png" alt @click.stop="deleteAddress(item.id)" />
            <img @click.stop="edit(item)" src="../../assets/image/edit.png" alt />
          </div>
        </div>
      </template>
      <template v-else>
        <v-empyt></v-empyt>
      </template>
    </div>
    <div class="save" @click="add()">添加新地址</div>
  </div>
</template>

<script>
import Header from "@/common/_header.vue";
import { Toast } from "mint-ui";
import Empyt from "@/common/_empty.vue";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    edit(item) {
      localStorage.addressinfo = JSON.stringify(item);
      this.$router.push("/address/edit");
    },
    add() {
      this.$router.push("/address/add");
    },
    localAddress(item) {
      if (this.$route.params.status === "order") {
        localStorage.addressinfo = JSON.stringify(item);
        this.$router.go(-1);
      }
    },
    async getAddressList() {
      const res = await this.$axios.addressList({});
      if (res.status === "20000") {
        this.list = res.data;
      }
    },

    async deleteAddress(id) {
      const path = `/personal/address/${id}/delete/`;
      const res = await this.$axios.delAddress(path, {});
      if (res.status === "20000") {
        Toast("删除成功");
        this.getAddressList();
      }
    }
  },
  components: {
    "v-header": Header,
    "v-empyt": Empyt
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  .all {
    width: 100%;
    padding: 0 30px;
    margin-top: 35px;
    .list {
      height: 110px;
      border-top: 1px solid #9b9b9b;
      font-size: 12px;
      display: flex;
      padding: 10px;
      justify-content: space-between;
      & > div:nth-child(1) {
        border: 2px solid #9b9b9b;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-top: 4px;
      }
      & > div:nth-child(2) {
        width: 180px;
        & > div {
          margin-bottom: 5px;
        }
        & > .default {
          width: 37px;
          height: 17px;
          color: #9b9b9b;
          border: 1px solid #9b9b9b;
          text-align: center;
          line-height: 17px;
        }
      }
      & > div:nth-child(3) {
        & > img:first-child {
          margin-right: 10px;
        }
      }
    }
    .list:last-child {
      border-bottom: 1px solid #9b9b9b;
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
  margin-top: 23px;
}
</style>