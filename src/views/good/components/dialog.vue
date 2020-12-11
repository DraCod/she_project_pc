<template>
  <el-dialog title="添加" :visible.sync="dialog" width="500" :before-close="handleClose">
    <el-form
      :model="form"
      ref="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="goods">
        <el-input v-model="form.goods" class="is-width"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="class_id">
        <el-select v-model="form.class_id" placeholder="请选择" class="is-width">
          <el-option
            v-for="item in class_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主图" prop="main_id">
        <upload-img :src="form.main_url" @upload="upload('main', $event)"></upload-img>
      </el-form-item>
      <el-form-item label="附图" prop="path_arr">
        <upload-img
          v-for="(item, index) in form.path_arr"
          :key="index"
          :src="item.url"
          @upload="upload_arr('path', $event, index)"
        ></upload-img>
      </el-form-item>
      <el-form-item label="详情图" prop="detail_arr">
        <upload-img
          v-for="(item, index) in form.detail_arr"
          :key="index"
          :src="item.url"
          @upload="upload_arr('detail', $event, index)"
        ></upload-img>
      </el-form-item>
      <el-form-item label="总数" prop="total">
        <el-input v-model.number="form.total" class="is-width"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { classifyList } from "@/api/classify";
import { addGood, getImg,editGood } from "@/api/good";
export default {
  props: {
    value: {},
    edit: {}, //是否编辑
    goods: {},
  },
  data() {
    return {
      dialog: false,
      form: {
        goods: "",
        class_id: "", //分类id
        main_url: "", //主图路径
        main_id: "", //主图id
        path_arr: [""], //附图数组
        detail_arr: [""], //详情图数组
        total: 0, //总数
      },
      rules: {
        goods: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
        class_id: [{ required: true, message: "分类不能为空", trigger: "blur" }],
        main_id: [{ required: true, message: "主图不能为空", trigger: "change" }],
        path_arr: [{ required: true, validator: this.pathPass, trigger: "change" }],
        detail_arr: [{ required: true, validator: this.detailPass, trigger: "change" }],
      },
      class_list: [],
    };
  },
  mounted() {
    this.get_class();
  },
  methods: {
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let form = Object.assign({}, this.form);
          form.path_arr.splice(form.path_arr.length - 1, 1);
          form.path_id = form.path_arr.map((row) => row.id).join(",");
          form.detail_arr.splice(form.detail_arr.length - 1, 1);
          form.detail_id = form.detail_arr.map((row) => row.id).join(",");
          if (this.edit) {
            editGood(form).then(res=>{
              this.$message({ message: res.msg, type: "success" });
              this.dialog = false;
              this.$emit("init");
            })
          } else {
            addGood(form).then((res) => {
              this.$message({ message: res.msg, type: "success" });
              this.dialog = false;
              this.$emit("init");
            });
          }
        } else {
          return false;
        }
      });
    },
    async edit_init() {
      let form = {};
      const { goods } = this;
      form.id = goods.id;
      form.goods = goods.goods;
      form.class_id = goods.class.id;
      form.main_url = this.$url + goods.main.path;
      form.main_id = goods.main.id;
      form.total = goods.total;
      await getImg({ img: goods.path_id }).then((res) => {
        form.path_arr = res.data.map((ro) => ({ id: ro.id, url: this.$url + ro.path }));
        form.path_arr.push("");
      });
      await getImg({ img: goods.detail_id }).then((res) => {
        form.detail_arr = res.data.map((ro) => ({ id: ro.id, url: this.$url + ro.path }));
        form.detail_arr.push("");
      });
      this.form = form;
    },
    get_class() {
      classifyList().then((res) => {
        this.class_list = res.data.map((ro) => ({ label: ro.classify, value: ro.id }));
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    pathPass(rule, value, callback) {
      if (value.length == 1) {
        callback(new Error("附图不能为空"));
      } else {
        callback();
      }
    },
    detailPass(rule, value, callback) {
      if (value.length == 1) {
        callback(new Error("详情图不能为空"));
      } else {
        callback();
      }
    },
    upload(key, { url, id }) {
      this.form[key + "_url"] = url;
      this.form[key + "_id"] = id;
    },
    upload_arr(key, { url, id }, index) {
      this.form[key + "_arr"].splice(index, 1, { url, id });
      if (this.form[key + "_arr"][this.form[key + "_arr"].length - 1] !== "") {
        this.form[key + "_arr"].push("");
      }
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
          this.edit_init();
        } else {
          this.$nextTick(() => {
            this.form = {
              goods: "",
              class_id: "", //分类id
              main_url: "", //主图路径
              main_id: "", //主图id
              path_arr: [""], //附图数组
              detail_arr: [""], //详情图数组
              total: 0, //总数
            };
          });
        }
      }
    },
  },
  components: {
    uploadImg: require("./upload-img.vue").default,
  },
};
</script>

<style scoped>
.is-width {
  width: 250px;
}
/deep/ .el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
</style>
