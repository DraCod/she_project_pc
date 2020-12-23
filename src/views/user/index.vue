<template>
  <div class="page">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="id" width="150"> </el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" width="100" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="giveWallet" label="赠送余额"></el-table-column>
      <el-table-column prop="rechargeWallet" label="充值余额"></el-table-column>
      <el-table-column prop="openId" label="openid"> </el-table-column>
      <el-table-column prop="openId" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdAt | getTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope='scope'>
          <el-button @click="option(scope.row)">赠送余额</el-button>
        </template>
      </el-table-column>
    </el-table>
    <give-wallet v-model="dialog" :user_id="user_id" @init='get_list'></give-wallet>
  </div>
</template>

<script>
import { userList } from "@/api/user";
export default {
  data() {
    return {
      list: [],
      dialog:false,
      user_id:''
    };
  },
  mounted() {
    this.get_list();
  },
  methods: {
    get_list() {
      userList().then((res) => {
        this.list = res.data;
      });
    },
    option(item){
      this.dialog = true;
      this.user_id = item.id
    }
  },
  filters: {
    getTime(val) {
      return new Date(val).toLocaleString();
    },
  },
  components:{
    giveWallet:require("./componetns/dialog.vue").default
  }
};
</script>

<style lang="less" scoped>
</style>