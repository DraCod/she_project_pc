<template>
    <el-dialog
        title="操作"
        :visible.sync="dialog"
        width="500px"
        :before-close="handleClose">
        <span>这是一段内容</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="dialog = false">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
export default {
    props:{
        value:{}
    },
    data(){
        return{
            dialog:false
        }
    },
    methods: {
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