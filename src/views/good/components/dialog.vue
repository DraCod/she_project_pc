<template>
  <el-dialog title="添加" :visible.sync="dialog" width="30%">
    <el-upload
      class="avatar-uploader"
      :action=" url+ 'pc/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="form.img_url" :src="form.img_url" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="dialog = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
const url=process.env.VUE_APP_BASE_API
export default {
  props: {
    value: {},
  },
  data() {
    return {
      dialog: false,
      url,
      form:{
          img_id:"",
          img_url:''
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
    //   console.log(res, file);
      this.form.img_url=this.url+res.path;
      this.form.img_id=res.id;
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang='scss' scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>