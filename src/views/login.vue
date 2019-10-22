<template>
  <el-card class="box-card">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="float:right"
          type="primary"
          @click="submitForm('ruleForm')"
          @keyup.enter="submitForm('ruleForm')"
        >登录</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { login, getUser } from "@/api/login";
export default {
  data() {
    return {
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = `username=${this.ruleForm.account}&password=${this.ruleForm.password}&grant_type=password`;
          login(params)
            .then(res => {
              const { access_token, token_type, expires_in } = res.data;
              localStorage.setItem(
                "access_token",
                `${token_type} ${access_token}`
              );
              //获取登录用户
              getUser().then(res => {
                let { UserName, UserID } = res;
                localStorage.setItem("account", UserName);
                this.$router.replace({ path: "/layout" });
              });
            })
            .catch(error => {
              this.$message({
                message: error.response.data.error,
                type: "warning"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // height: 280px;
  width: 480px;
}
</style>