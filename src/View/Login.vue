<template>
    <el-form ref="form" :model="form" :rules="rules" class="login-container" :inline="true" label-width="70px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username" >
            <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 105px;margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'

export default {
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit() {
            // const token = Mock.Random.guid()
            // Cookie.set('token',token)
            // this.$router.push('/home')
            this.$refs.form.validate((valid) => {
                if(valid) {
                    getMenu(this.form).then(({ data }) => {
                    console.log(data)
                    if(data.code === 20000) {
                        Cookie.set('token',data.data.token)

                        // 先将数据存入store中
                       this.$store.commit('setMenu', data.data.menu)
                       this.$store.commit('addMenu', this.$router)

                        this.$router.push('/home')
                    }else {
                        this.$message.error('密码错误');
                   }    
                })
               }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .login-container {
        width: 350px;
        margin: 180px auto;
        border: 1px solid #eaeaea;
        border-radius: 15px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #cac6c6;
        background-color: #fff;
        box-sizing: border-box;
        .login_title {
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }
        .el-input {
            width: 198px;
        }
    }
</style>