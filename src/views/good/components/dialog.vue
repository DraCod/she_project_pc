<template>
  <el-dialog title="添加" :visible.sync="dialog" width="30%">
    <el-form :model="form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="goods">
        <el-input v-model="form.goods" class="is-width"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="class_id">
        <el-select v-model="form.class_id" placeholder="请选择" class="is-width">
          <el-option
            v-for="item in class_list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主图" prop="main_id">
        <upload-img :src="form.main_url" @upload="upload('main',$event)"></upload-img>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="dialog = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {classifyList} from '@/api/classify'
export default {
  props: {
    value: {},
  },
  data() {
    return {
      dialog: true,
      form:{
        goods:"",
        class_id:'',//分类id
        main_url:'',//主图路径
        main_id:'',//主图id
      },
      class_list:[

      ]
    };
  },
  mounted(){
    classifyList().then(res=>{
      this.class_list=res.data.map(ro=>({label:ro.classify,value:ro.id}))
    })
  },
  methods: {
    upload(key,{url,id}){
      this.form[key+'_url']=url
      this.form[key+'_id']=id
    }
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },
  components:{
    uploadImg:require('./upload-img.vue').default
  }
};
</script>

<style lang='scss' scoped>
  .is-width{
    width:250px;
  }
</style>