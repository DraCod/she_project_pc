<template>
    <el-dialog
        title="操作"
        :visible.sync="dialog"
        width="500px"
        :before-close="handleClose">
        <el-steps :active="active" finish-status="success">
            <el-step title="待付款"></el-step>
            <el-step title="等待发货"></el-step>
            <el-step title="已发货"></el-step>
            <el-step title="待评价"></el-step>
            <el-step title="交易完成"></el-step>
        </el-steps>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="next">下一步</el-button>
        </span>
    </el-dialog>

</template>

<script>
import {eidtOrder} from '@/api/order';
export default {
    props:{
        value:{},
        active:{},
        id:{},
    },
    data(){
        return{
            dialog:false
        }
    },
    methods: {
        next(){
            eidtOrder({
                id:this.id,
                status:this.active+1
            }).then(res=>{
                this.$message({
                    type:'success',
                    message:res.meg
                })
                this.dialog=false;
                this.$emit('init')
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    },
    watch:{
        value(val){
            this.dialog=val;
        },
        dialog(val){
            this.$emit('input',val)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>