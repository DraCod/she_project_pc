<template>
  <el-dialog :title="edit?'修改':'新增'" :visible.sync="dialog" width="30%">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="classify">
        <el-input v-model="form.classify" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { classifyAdd,classifyEdit } from "@/api/classify";
export default {
  props: {
    value: {},
    editform: {},
    edit: {},
  },
  data() {
    return {
      form: {
        classify: "",
      },
      rules: {
        classify: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur",
          },
        ],
      },
      dialog: false,
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.edit) {
            classifyEdit(this.form).then(res=>{
              this.dialog = false;
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.$emit("init");
            })
          } else {
            classifyAdd(this.form).then((res) => {
              this.dialog = false;
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.$emit("init");
            });
          }
        } else {
          return false;
        }
      });
    },
    close() {
      this.dialog = false;
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      if (val) {
        if (this.edit) {
          this.form = this.editform;
        } else {
          this.form = {
            classify: "",
          };
        }
      }
    },
  },
};
</script>
