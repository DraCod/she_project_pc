<template>
  <div class="page">
    <el-button type="primary" size="small" @click="add">新增</el-button>
    <el-table :data="list" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="classify" label="分类" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createdAt|getTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <classify-dialog v-model="show" @init="get_list" :edit="is_edit" :editform="editform"></classify-dialog>
  </div>
</template>

<script>
import { classifyList } from '@/api/classify'
export default {
  data() {
    return {
      list: [],
      show:false,
      loading:false,
      editform:{},
      is_edit:false
    }
  },
  mounted() {
    this.get_list()
  },
  methods: {
    edit(row){
      this.is_edit=true;
      this.editform=row;
      this.show=true;
    },
    get_list() {
      this.loading=true;
      classifyList().then((res) => {
        this.list = res.data
      }).finally(()=>{
        this.loading=false
      })
    },
    add(){
      this.is_edit=false;
      this.show=true;
    }
  },
  filters: {
    getTime(val) {
      return new Date(val).toLocaleString()
    }
  },
  components:{
    classifyDialog:require('./components/dialog.vue').default
  }
}
</script>

<style lang="scss" scoped>

</style>
