<template>
    <el-dialog
        title="图片上传"
        :visible.sync="dialog"
        width="700px">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上传类型">
                <el-select v-model="form.type">
                    <el-option 
                        v-for="(item,index) in type_list" 
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" prop="img">
                <upload-img :src='imageUrl' @upload="upload"></upload-img>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {addAdvert} from '@/api/advert'
export default {
    props:{
      value:{},  
    },
    data(){
        return{
            dialog:false,
            form:{
                type:1,
                img:''
            },
            type_list:[
                {
                    label:'轮播图',
                    value:1
                },
                {
                    label:'广告',
                    value:2
                }
            ],
            rules:{
                img:{ required: true, message: '请选择图片'},
            },
            imageUrl:''
        }
    },
    methods:{
        upload({url,id}){
            this.imageUrl = url;
            this.form.img = id;
        },
        close(){
            this.dialog = false
        },
        submit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    addAdvert(this.form).then(res=>{
                        this.$message({type:'success',message:res.msg});
                        this.dialog = false;
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
            if(this.val){
                this.$nextTick(()=>{
                    this.$refs['ruleForm'].resetFields();
                })
            }
        },
        dialog(val){
            this.$emit('input',val);
        }
    },
    components:{
        uploadImg:require('@/views/good/components/upload-img.vue').default
    }
}
</script>