<template>
    <div class="page">
        <el-button @click="add" size="small" type="primary">新增</el-button>
        <good-dialog v-model="show"></good-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show:false
        }
    },
    methods:{
        add(){
            this.show=true
        }
    },
    components:{
        goodDialog:require('./components/dialog.vue').default
    }
}
</script>

<style lang="scss" scoped>

</style>