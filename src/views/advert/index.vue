<template>
    <div class="page">
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
    </div>
</template>

<script>
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
            type:''
        }
    },
    methods:{
        search(){

        }
    }
}
</script>

<style lang="scss" scoped>
    .shadow{
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .m-l{
        margin-left: 15px;
    }
</style>