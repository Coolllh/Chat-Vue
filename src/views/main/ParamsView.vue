<template>
  <div>
    <el-button type="primary" @click="openDialog">打开弹窗</el-button>
    <el-dialog title="多项输入" :visible.sync="dialogVisible" width="400px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <!-- 在这里添加更多的输入字段 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: "",
        email: "",
        // 在这里添加更多的输入字段
      },
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    handleConfirm() {
      // 在这里处理用户输入
      const { name, email } = this.formData;
      // 执行逻辑，保存用户输入或进行其他操作
      console.log("姓名:", name);
      console.log("邮箱:", email);

      // 关闭对话框
      this.dialogVisible = false;
    },
  },
};
</script>
