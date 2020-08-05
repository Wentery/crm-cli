<template>
  <div class="login-view">
    <div class="form">
      <el-card>
        <h1 class="title">
          <i class="el-icon-help"></i>
          <span class="name">CRM</span>
        </h1>
        <el-form label-width="0">
          <el-form-item>
            <el-input placeholder="Username" prefix-icon="el-icon-user" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Password" prefix-icon="el-icon-lock" show-password v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleLogin">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import path from '@/assets/js/path'
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  methods: {
    async handleLogin() {
      let params = JSON.parse(JSON.stringify(this.form));
      let formData = new FormData();
      Object.keys(params).map(item => {
        formData.append(item, params[item])
      })
      this.$api.login(formData).then(res => {
        console.log(res)
        if(res.code === 200) {
          const token = res.data;
          this.$store.commit('setToken', token);
          this.$router.push('/home')
          this.getMenu();
        } else {
          this.$message.error(res.message);
        }
      })
    },
    getMenu() {
      this.$api.getMenuList().then(res => {
        if(res.code === 0) {
          let firstTab = res.data[0].menus[0];
          let url = firstTab.url;
          let component = path[url]
          let tab = {
            label: firstTab.name,
            component,
            query: {},
            path: url
          }
          this.$store.commit("pushToTabs", tab)
          // this.$router.push({
          //   path,
          //   params: {
          //     id: 1,
          //     name: 'test'
          //   }
          // })
        } else {
          this.$message.error(res.message || res.msg);
        }
      }).catch(rej => {
        console.log(rej)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color:#1fc8db;
  background-image:linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%);
  .form {
    width: 100%;
    max-width: 400px;
    margin-top: 200px;
    .title {
      text-align: center;
      font-size: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .el-icon-help {
          color: #1fc8db;
          margin-right: 5px;
          font-size: 35px;
      }
      .name {
          color: #303133;
          font-family:  Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif;
          user-select: none;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
