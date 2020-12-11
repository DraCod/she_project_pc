<template>
  <el-upload
    class="avatar-uploader"
    :action="url + 'pc/upload'"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
  >
    <img v-if="src" :src="src" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
const url = process.env.VUE_APP_BASE_API;
export default {
  props: ["src"],
  data() {
    return {
      url,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.$emit('upload',{
            url:this.url + res.path,
            id:res.id
        })
    //   this.form.img_url = this.url + res.path;
    //   this.form.img_id = res.id;
    },
  },
};
</script>

<style lang='scss' scoped>
.avatar-uploader{
  display: inline-block;
  vertical-align: top;
}
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