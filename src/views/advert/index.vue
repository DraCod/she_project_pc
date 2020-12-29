<template>
    <div class="page">
        <el-button type="primary" size="small" @click="add">添加</el-button>
        <div class="shadow">
            <label>
                订单号：
                <el-select v-model="type" placeholder="请选择" size="small" >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </label>
            <el-button class="m-l" type="primary" size="small" @click="search">搜索</el-button>
        </div>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.path" width='300' alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="图片类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type==1?'轮播':'广告'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="添加时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt|getTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="samll" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <ui-dialog v-model="dialog" @init="search">
        </ui-dialog>
    </div>
</template>

<script>
import {advertList,removeAdvert} from '@/api/advert'
export default {
    data(){
        return{
            options:[
                {
                    label:'全部广告',
                    value:''
                },
                {
                    label:'首页轮播',
                    value:1
                },
                {
                    label:'首页商品广告',
                    value:2
                }
            ],
            type:'',
            list:[],
            dialog:false
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        search(){
            advertList({
                type:this.type
            }).then(res=>{
                this.list = res.data.map(row=>{
                    row.path = this.$url+row.path.path
                    return row
                })
            })
        },
        remove(row){
            this.$confirm('是否删除该图片?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeAdvert({id:row.id})
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        add(){
            this.dialog = true
        }
    },
    filters: {
        getTime(val) {
            return new Date(val).toLocaleString()
        }
    },
    components:{
        uiDialog:require('./components/dialog.vue').default
    }
}
</script>

<style lang="scss" scoped>
    .shadow{
        padding: 10px 20px;
        box-sizing: border-box;
        margin-top: 15px;
    }
    .m-l{
        margin-left: 15px;
    }
</style>