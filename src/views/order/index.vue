<template>
    <div class="page">
        <div class="shadow">
            <label for="">
                订单号：
                <el-input class="is-width" v-model="form.order" size="small"></el-input>
            </label>
            <label for="">
                订单号：
                <el-select v-model="form.status" placeholder="请选择订单状态" clearable>
                    <el-option 
                        v-for="(item,index) in status_list" 
                        :key="index"
                        :label="item.label" 
                        :value="item.value">
                    </el-option>
                </el-select>
            </label>
        </div>
    </div>
</template>

<script>
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
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.shadow{
    padding: 10px;
    box-sizing: border-box;
}
    .is-width{
        width: 200px;
    }
</style>