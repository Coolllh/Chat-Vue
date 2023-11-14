<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column fixed prop="date" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <el-table-column prop="province" label="省份" width="120">
    </el-table-column>
    <el-table-column prop="city" label="市区" width="120"> </el-table-column>
    <el-table-column prop="address" label="地址" width="300"> </el-table-column>
    <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="140">
      <template slot-scope="scope">
        <el-button @click="openDialog()" type="text" size="small"
          >添加</el-button
        >
        <el-dialog
          title="新增数据"
          :visible.sync="dialogVisible"
          :append-to-body="true"
          width="400px"
        >
          <el-form :model="formData" label-width="80px">
            <el-form-item label="日期">
              <el-input v-model="formData.date"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="省份">
              <el-input v-model="formData.province"></el-input>
            </el-form-item>
            <el-form-item label="市区">
              <el-input v-model="formData.city"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input v-model="formData.zip"></el-input>
            </el-form-item>
            <!-- 在这里添加更多的输入字段 -->
            <el-button @click="dialogVisible = false">取消</el-button>
            <!-- 添加取消按钮 -->
            <el-button type="primary" @click="determine">确定</el-button>
            <!-- 添加确定按钮 -->
          </el-form>
        </el-dialog>
        <el-button @click="dataDelete(scope.row)" type="text" size="small"
          >删除</el-button
        >
        <el-button @click="openDialog1(scope.row)" type="text" size="small"
          >编辑</el-button
        >
        <el-dialog
          title="修改数据"
          :visible.sync="dialogVisible1"
          :append-to-body="true"
          width="400px"
        >
          <el-form :model="formData" label-width="80px">
            <el-form-item label="日期">
              <el-input v-model="formData.date"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="省份">
              <el-input v-model="formData.province"></el-input>
            </el-form-item>
            <el-form-item label="市区">
              <el-input v-model="formData.city"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input v-model="formData.zip"></el-input>
            </el-form-item>
            
            <!-- 在这里添加更多的输入字段 -->
            <el-button @click="dialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="determine2">确定</el-button>
          </el-form>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axiosInstance from "@/store/request";

export default {
  inject: ["reload"],
  data() {
    return {
      oldname: "",
      dialogVisible: false,
      dialogVisible1: false,
      formData: {
        date: "",
        name: "",
        province: "",
        city: "",
        address: "",
        zip: "",
        // 在这里添加更多的输入字段
      },
      tableData: [],
    };
  },
  //钩子函数
  created() {
    console.log("hahaah");
    this.loadon();
  },
  methods: {
    //删除
    dataDelete(row) {
      console.log(row.name + "row");
      axiosInstance
        .get("/dropdata", {
          params: {
            name: row.name,
          },
        })
        .then((response) => {
          
          console.log(response);
          if (response.data === "ok") {
            this.$message({
              message: "删除成功",
              type: "success",
              this: this.reload(),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //查询
    loadon() {
      console.log("loadon被调用了");
      axiosInstance.post("/getdata").then((response) => {
        // console.log(response.status+"1")
        if (response) {
          if (response.status === 200) {
            console.log(response.status + "2");
            this.tableData = response.data;
          }
        }
      });
      console.log("aaaaaa");
      // this.tableData=this.respdata
    },
    openDialog() {
      this.dialogVisible = true;
    },
    openDialog1(row) {
      this.oldname = row.name;
      this.dialogVisible1 = true;
    },
    //新增数据确定按钮
    determine() {
      // 在这里处理用户输入
      const { date, name, province, city, address, zip } = this.formData;
      // 执行逻辑，保存用户输入或进行其他操作
      console.log(date + "date");

      axiosInstance
        .get("/adddata", {
          params: {
            date: date,
            name: name,
            province: province,
            city: city,
            address: address,
            zip: zip,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      this.reload();
      // 关闭对话框
      this.dialogVisible = false;
    },

    //编辑数据确定按钮
    determine2() {
      // 在这里处理用户输入
      const { date, name, province, city, address, zip } = this.formData;

      // 执行逻辑，保存用户输入或进行其他操作

      axiosInstance
        .get("/updatedata", {
          params: {
            oldname: this.oldname,
            date: date,
            name: name,
            province: province,
            city: city,
            address: address,
            zip: zip,
          },
        })
        .catch((error) => {
          console.log(error);
        });

      this.reload();
      // 关闭对话框
      this.dialogVisible1 = false;
    },
  },
};
</script>