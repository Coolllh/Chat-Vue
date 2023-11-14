<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ChatABC</span>
      </div>
      <el-tabs v-model="currentIndex" stretch @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
            <el-form-item label="账号" label-width="80px" prop="account">
              <el-input type="text" v-model="loginForm.account" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm">
            <el-form-item label="账号" label-width="80px" prop="account">
              <el-input type="text" v-model="registerForm.account"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px" prop="email">
              <el-input type="text" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" label-width="80px" prop="checkPassword">
              <el-input type="password" v-model="registerForm.checkPassword"></el-input>
            </el-form-item>
            <el-form-item label="验证码" label-width="80px" prop="code">
              <el-input type="text" v-model="registerForm.code" class="code"></el-input>
              <span v-if="codeShow" style="color: rgb(0, 238, 255);cursor: pointer; /*悬停变小手的属性*/"
                @click="getCode()">获取验证码</span>
              <span v-if="!codeShow" style="color: rgb(0, 238, 255);">{{ count }}秒后重试</span>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axiosInstance from "@/store/request";
export default {
  data() {



    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else if (value.length < 3) {
        return callback(new Error("请输入3位以上的账号"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (this.activeTab === "login") {
        if (!value) {
          return callback(new Error("请输入密码"));
        } else {
          callback();
        }
      }
      if (this.activeTab === "register") {
        if (!value) {
          return callback(new Error("请输入密码"));
        } else if (value.length < 6) {
          callback(new Error("请输入六位以上的密码"));
        } else if (value.length > 16) {
          callback(new Error("请输入16位以下的密码"));
        } else {
          callback();
        }
      }
    };
    var validateRegisterCheckPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      } else if (this.registerForm.password !== value) {
        return callback(new Error("两次密码输入不一致"));
      } else {
        return callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      codeShow: true,
      count: "",
      timer: null,

      currentIndex: "login",
      loginForm: {
        account: "",
        password: "",
      },
      registerForm: {
        username: "",
        email: "",
        code: "",
        account: "",
        password: "",
        checkPassword: "",
      },
      activeTab: "login",
      rules: {
        account: [
          {
            validator: validateAccount,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
        checkPassword: [
          {
            validator: validateRegisterCheckPassword,
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        code: [
          {
            validator: validateCode,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    getCode() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.registerForm.email)) {
        alert("请输入正确的邮箱");
      }
      else {
        const TIME_COUNT = 60;
        axiosInstance.post("/sendCode", {
          email: this.registerForm.email,
        });
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.codeShow = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;

            }
            else {
              this.codeShow = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }

    },
    submitForm(formname) {
      const that = this;
      this.$refs[formname].validate((valid) => {
        if (valid) {
          if (this.activeTab === "login") {
            console.log(this.loginForm.username);
            console.log(this.loginForm.password);

            axiosInstance
              .post("/login", {

                account: this.loginForm.account,
                password: this.loginForm.password,

              })
              .then(function (response) {
                if (response.data.responseStr !== "No") {
                  that.$store.commit("setToken", response.data.responseStr);
                  that.$router.push({ path: "/table" });
                } else {
                  alert("账号密码错误");
                }
              });

            // console.log(this.username+"pass"+this.password);
          }
          if (this.activeTab === "register") {
            const that = this;
            axiosInstance.post("/checkCode", {
              email: that.registerForm.email,
              code: that.registerForm.code,
            }).then(function (response) {
              if (response.data === true) {
                alert("验证码正确");

                axiosInstance
                  .post("/register", {

                    account: that.registerForm.account,
                    password: that.registerForm.password,
                    email: that.registerForm.email,

                  })
                  .then(function (response) {
                    if (response.data.status === 200) {
                      alert("注册成功");
                    } else if (response.data.status === 1001) {
                      alert("账号已存在");
                    } else if (response.data.status === 1002) {
                      alert("该邮箱已被注册");
                    } else {
                      alert("注册失败")
                    }

                  });


              } else if (response.data === false) {
                alert("验证码错误");
              } else {
                alert("验证码失效");
              }
            });

            // .catch(){
            //   //抛出网络请求异常
            // }
            console.log(this.registerForm);
          }
        } else {
          console.log("abc");
          return;
        }
      });
    },
    handleClick(tab) {
      this.activeTab = tab.name;
      // console.log("active"+this.activeTab)
      // console.log("tab"+tab.name)
    },
  },
};
</script>

<style>
.login {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.box-card {
  width: 500px;
  margin: 100px auto;
}

.code {
  width: 200px;
  margin-right: 107px;
}
</style>