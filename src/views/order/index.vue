<template>
    <div class="page">
        <div class="shadow">
            <label for="order">
                订单号：
                <el-input id="order" class="is-width" v-model="form.order" size="small"></el-input>
            </label>
            <label for="">
                订单状态：
                <el-select v-model="form.status" size="small" placeholder="请选择订单状态" clearable>
                    <el-option 
                        v-for="(item,index) in status_list"
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </label>
            <el-button class="m-l" type="primary" size="small" @click="search">搜索</el-button>
            <el-button type="warrn" size="small" @click="clear">清空搜索</el-button>
        </div>
        <el-table :data="data_list" style="width: 100%" class="m-t" v-loading="loading">
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="user" label="用户">
                <template slot-scope="scope">
                    {{scope.row.user.userName}}
                </template>
            </el-table-column>
            <el-table-column prop="total" label="总数">
                <template slot-scope="scope">
                    {{scope.row.goodList.length}}
                </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="订单号"/>
            <el-table-column prop="orderNum" label="订单状态">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.status==1">待付款</span>
                        <span v-if="scope.row.status==2">等待发货</span>
                        <span v-if="scope.row.status==3">已发货</span>
                        <span v-if="scope.row.status==4">待评价</span>
                        <span v-if="scope.row.status==5">交易完成</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.createdAt|getTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" v-if='scope.row.status<5' @click="operation(scope.row)">操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <operation v-model="dialog" :active="active" :id="id" @init="search">
        </operation>
    </div>
</template>

<script>
import {orderList} from '@/api/order'
export default {
    data(){
        return{
            form:{
                order:'',
                status:''
            },
            status_list:[
                {
                    label:'待付款',
                    value:1
                },
                {
                    label:'等待发货',
                    value:2
                },
                {
                    label:'已发货',
                    value:3
                },
                {
                    label:'待评价',
                    value:4
                },
                {
                    label:'交易完成',
                    value:5
                }
                // 1、待付款 
                // 2、付款完成，等待发货
                // 3、已发货
                // 4、已签收、待评价
                // 5、评价完毕，交易完成
            ],
            data_list:[],
            loading:false,
            dialog:false,
            id:'',
            active:false,
        }
    },
    mounted(){
        this.search();
    },
    methods:{
        operation(row){
            this.dialog=true;
            this.active=row.status;
            this.id=row.id;
        },
        search(){
            this.loading = true
            orderList(this.form).then(res=>{
                this.data_list=res.data.map(ro=>{
                    ro.goodList=JSON.parse(ro.goodList);
                    return ro
                });
                this.loading=false
            })
        },
        clear(){
            this.form={
                order:'',
                status:''
            }
        }
    },
    filters: {
        getTime(val) {
            return new Date(val).toLocaleString()
        }
    },
    components:{
        operation:require("./components/dialog.vue").default
    }
}
</script>

<style lang="scss" scoped>
.shadow{
    padding: 10px 20px;
    box-sizing: border-box;
}
    .is-width{
        width: 200px;
    }
    .m-l{
        margin-left: 15px;
    }
    .m-t{
        margin-top: 15px;
    }
</style>