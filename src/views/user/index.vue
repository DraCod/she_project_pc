<template>
  <div class="page">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="id" width="150"> </el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="openId" label="openid"> </el-table-column>
      <el-table-column prop="openId" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdAt | getTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userList } from "@/api/user";
export default {
  data() {
    return {
      list: [],
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
  },
  filters: {
    getTime(val) {
      return new Date(val).toLocaleString();
    },
  },
};
</script>

<style lang="less" scoped>
</style>