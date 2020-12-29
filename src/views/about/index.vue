<template>
    <div class="page">
        <div class="about"></div>
        <div class="option">
            <el-button class="button" @click="submit" size="small" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
import wangEditor from 'wangeditor';
import {editText,getText} from '@/api/text'
export default {
    data(){
        return{
            editorData:'',
            editor:null,
        }
    },
    mounted() {
        const editor = new wangEditor(`.about`)
        editor.config.onchange = (newHtml) => {
            this.editorData = newHtml
        }
        editor.create()
        this.editor = editor;
        getText({id:1}).then(res=>{
            editor.txt.html(res.data.content)
        })
        editor.config.uploadImgServer = this.$url+'pc/text-img-upload'
    },
    methods:{
        submit(){
            editText({
                id:1,
                content:this.editorData
            }).then(res=>{
                this.$message({type:'success',message:res.msg})
            })
        }
    },
    beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
        this.editor.destroy()
        this.editor = null
    }
}
</script>

<style lang="scss" scoped>
    .option{
        margin-top:20px
    }
</style>