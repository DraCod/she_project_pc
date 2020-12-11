<template>
    <div class="page">
        <el-button @click="add" size="small" type="primary">新增</el-button>
        <el-table :data="list" style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="id"/>
            <el-table-column label="商品主图">
                <template slot-scope="scope">
                    <img :src="$url+scope.row.main.path" height="100" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="goods" label="商品名称"/>
            <el-table-column prop="total" label="总数"/>
            <el-table-column label="剩余数量">
                <template slot-scope="scope">
                    {{scope.row.total-scope.row.buy}}
                </template>
            </el-table-column>
            <el-table-column label="分类">
                <template slot-scope="scope">
                    {{scope.row.class.classify}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createdAt|getTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <good-dialog v-model="show" :edit="is_edit" :goods="goods" @init="init"></good-dialog>
    </div>
</template>

<script>
import {goodList} from '@/api/good';
export default {
    data(){
        return{
            show:false,
            list:[],
            loading:false,
            is_edit:false,
            goods:{}
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            goodList().then(res=>{
                this.list=res.data
            })
        },
        edit(row){
            this.goods=row;
            this.is_edit=true;
            this.show=true;
        },
        add(){
            this.show=true;
            this.is_edit=false;
        },
    },
    filters: {
        getTime(val) {
            return new Date(val).toLocaleString()
        }
    },
    components:{
        goodDialog:require('./components/dialog.vue').default
    }
}
</script>

<style lang="scss" scoped>

</style>