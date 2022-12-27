<template>
    <div class="login">
        <div class="shade">
            <header class="header">
                <img class="logo" src="../../assets/logo.png" />
                某某科技公司
            </header>
            <article class="article">
                <h1>登录界面</h1>
                <el-form label-position="right" label-width="80px" :model="form">
                    <el-form-item label="账号：">
                        <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input v-model="form.userPwd" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSignIn">登录</el-button>
                    </el-form-item>
                </el-form>
            </article>
        </div>
    </div>
</template>
<script>
// import { reqLogin } from "@/api/login";

import * as Api from "@/api/login";
import router from "@/router";

export default {
    name: "login",
    data() {
        return {
            form: {
                userName: "",
                userPwd: ""
            },

        };
    },
    created() {
      if (localStorage.getItem("token")){
        sessionStorage.setItem("token",localStorage.getItem("token"))
      }
        // this.onSignIn();
        // this.onWebSocket()
      this.checkToken()
    },

    mounted() {},
    methods: {
        /* 登录按钮 */
        async onSignIn() {
          var that = this
          const data = await Api.login(that.form.userName, that.form.userPwd);
          if (data.status === 200 && data.data.token !== '') {
            that.$message.success(data.msg);
            localStorage.setItem("token", data.data.token);
            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem("id", data.data.id);
            sessionStorage.setItem("name", data.data.name);
            sessionStorage.setItem("currentTerm", "2022秋季");
            console.log(data.data.dept)
            if (data.data.dept === 1) {
              sessionStorage.setItem("type", "admin")
              console.log("admin")
            } else if (data.data.dept === 2) {
              sessionStorage.setItem("type", "teacher")
              console.log("teacher")

            } else if (data.data.dept === 3) {
              sessionStorage.setItem("type", "student")
              console.log("student")

            } else if (data.data.dept === 4) {
              sessionStorage.setItem("type", "user")
              console.log("user")
            }
            sessionStorage.setItem("age", data.data.age)
            sessionStorage.setItem("gender", data.data.gender)
            sessionStorage.setItem("userphoto", data.data.userphoto)
            sessionStorage.setItem("username", data.data.username)
            sessionStorage.setItem("email", data.data.email)
            sessionStorage.setItem("registerTime", data.data.registerTime)
            sessionStorage.setItem("lastModificationTime", data.data.lastModificationTime)
            if (data.data.dept === 1) {
              router.push({name:'admin'})
            } else if (data.data.dept === 2) {

              router.push({name:'teacher'})

            } else if (data.data.dept === 3) {
              router.push({name:'student'})

            } else if (data.data.dept === 4) {
              router.push({name:'user'})

            }

          } else {
            that.$message.error(data.msg);
          }
          // reqLogin()
          //     .then(res => {
          //         console.log(res);
          //         // localStorage.setItem("token", res.token);
          //     })
          //     .catch(err => {
          //         console.log("登录失败", err);
          //     });

          this.$router.push({name: "Admin"});//需要根据权限跳转，还没写完
        },
        async checkToken() {
          var that = this
          const data = await Api.checkToken()
          if (data.status === 200 && data.data.token !== '') {
            that.$message.success(data.msg);
            sessionStorage.setItem("id", data.data.id);
            sessionStorage.setItem("name", data.data.name);
            sessionStorage.setItem("currentTerm", "2022秋季");
            if (data.data.dept === 1) {
              sessionStorage.setItem("type", "admin")
            } else if (data.data.dept === 2) {
              sessionStorage.setItem("type", "teacher")

            } else if (data.data.dept === 3) {
              sessionStorage.setItem("type", "student")
            } else if (data.data.dept === 4) {
              sessionStorage.setItem("type", "user")
            }
            sessionStorage.setItem("age", data.data.age)
            sessionStorage.setItem("userphoto", data.data.userphoto)

            sessionStorage.setItem("gender", data.data.gender)
            sessionStorage.setItem("username", data.data.username)
            sessionStorage.setItem("email", data.data.email)
            sessionStorage.setItem("registerTime", data.data.registerTime)
            sessionStorage.setItem("lastModificationTime", data.data.lastModificationTime)
            router.push('/admin')
          } else {
            that.$message.error(data.msg);
          }
        }
        // onWebSocket() {
        //     let count = 1;
        //     let ws = new WebSocket("ws://127.0.0.1:8888/websocket");
        //     ws.onopen = function(evt) {
        //         console.log("Connection open ...");
        //         console.log(evt);
        //     };

        //     ws.onmessage = function(evt) {
        //         console.log("后端发来的数据: " + evt.data);
        //         if (count++ == 10) ws.close();
        //     };

        //     ws.onclose = function(evt) {
        //         console.log(evt);
        //         console.log("Connection closed.");
        //     };

        //     ws.onerror = function(evt) {
        //         console.log(evt);
        //         console.log("error!!!");
        //     };
        // }
    }
};
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url(../../assets/login_bg.jpg) 0 0 no-repeat;
    background-size: 100%;
    .shade {
        height: 100%;
        width: 100%;
        background-color: #8899aa44;
        display: flex;
        flex-direction: column;
        align-items: center;
        .header {
            font-size: 60px;
            color: #eee;
            margin: 180px 0 50px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .logo {
                height: 70px;
                width: 70px;
                margin-right: 20px;
            }
        }
        .article {
            width: 400px;
            background-color: #ffffff44;
            padding: 20px 60px 40px 20px;
            border-radius: 20px;
            h1 {
                font-size: 20px;
                color: #eee;
                margin-left: 25px;
            }
            // /deep/ .el-form-item .el-form-item__label {
            //     color: #eee;
            // }
        }
    }
}
</style>