<template>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        label="用户">
        <template slot-scope="scope">
            {{scope.row.user.userName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="反馈的问题">
      </el-table-column>
      <el-table-column
        label="反馈时间">
        <template slot-scope="scope">
            {{scope.row.createdAt|getTime}}
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import {feedbackList} from '@/api/feedback'
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.get_list();
    },
    methods:{
        get_list(){
            feedbackList().then(res=>{
                this.list = res.data
            })
        }
    },
    filters: {
        getTime(val) {
            return new Date(val).toLocaleString()
        }
    },
}
</script>

<style lang="scss" scoped>

</style>