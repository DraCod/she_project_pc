<template>
    <el-dialog
        title="赠送余额"
        :visible.sync="dialog"
        width="300px">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="赠送金额" prop="give_wallet">
                <el-input v-model="form.give_wallet" type="number"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="check">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {giveWallet} from '@/api/user'
export default {
    props:{
        value:{},
        user_id:{}
    },
    data(){
        return{
            dialog:false,
            form:{
                give_wallet:0
            },
            rules: {
                give_wallet: [
                    { required: true, message: '请输入赠送金额', trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        check(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data={
                        giveWallet:this.form.give_wallet,
                        userId:this.user_id
                    }
                    giveWallet(data).then(res=>{
                        this.$message({type:'success',message:res.msg});
                        this.dialog = false
                        this.$emit('init')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    watch:{
        value(val){
            this.dialog = val;
            if(val){
                this.$nextTick(()=>{
                    this.$refs['ruleForm'].resetFields();
                })
            }
        },
        dialog(val){
            this.$emit('input',val);
        }
    }
}
</script>

<style lang="less" scoped>

</style>