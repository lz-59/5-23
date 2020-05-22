<template>
  <div class="log-box">
    <div class="log-dw">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import './styles.less'
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
        }
      };
    },
    watch: {
      isLogin (isLogin) {
        isLogin ? this.$router.push('/home') : null 
      }
    },
    methods: {
      ...mapActions('login', ['FETCH_LOGIN_ACTION']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this['FETCH_LOGIN_ACTION'](this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      ...mapState('login', ['isLogin'])
    }
  }
</script>

<style>

</style>