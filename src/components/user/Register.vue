<template>
  <div class="html_body" id="app">
    <div class="container">
      <router-link to="/home">
        <img src="../common/logo.jpg" alt id="logo">
      </router-link>
      <h2 class="form-signin-heading">用户注册</h2>
      <form class="form-signin" @submit.prevent="registerHandler">
        <label for="inputEmail" class="sr-only">邮箱</label>
        <span v-show="emailMessage" class="errorMessage">邮箱已存在</span>
        <br>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          name="email"
          v-model="forData.email"
          @blur="checkEmail"
          @input="checkEmail"
        >
        <label for="inputNickname" class="sr-only">昵称</label>
        <span v-show="nicknameMessage" class="errorMessage">昵称已存在</span>
        <br>
        <input
          type="text"
          id="inputNickname"
          class="form-control"
          placeholder="NickName"
          required
          name="nickname"
          v-model="forData.nickname"
          @blur="checkNickname"
          @input="checkNickname"
        >
        <label for="inputPassword" class="sr-only">密码</label>
        <a href="#" class="forget">忘记密码？</a>
        <br>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          name="password"
          v-model="forData.password"
        >
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          id="register"
        >注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
      </form>
      <div class="create">
        <span>已有账号？</span>
        <router-link to="/login">点击登录.</router-link>
      </div>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import "../common/user.css";
export default {
  data() {
    return {
      forData: {
        email: "",
        nickname: "",
        password: ""
      },
      emailMessage: false,
      nicknameMessage: false
    };
  },
  methods: {
    registerHandler: _.debounce(async function() {
      try {
        if (this.emailMessage || this.nicknameMessage) {
          return;
        }
        const res = await axios.post("/api/users", this.forData);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }, 1000),
    checkEmail: _.debounce(async function() {
      var { data } = await axios.get(`/api/users?email=${this.forData.email}`);
      this.emailMessage = data[0] ? true : false;
    }, 1000),
    checkNickname: _.debounce(async function() {
      var { data } = await axios.get(
        `/api/users?nickname=${this.forData.nickname}`
      );
      this.nicknameMessage = data[0] ? true : false;
    }, 1000)
    //   async checkEmail () {
    //       var {data} = await axios.get(`/api/users?email=${this.forData.email}`)
    //       this.emailMessage = data[0]
    //   }
  }
};
</script>

<style scoped>
.html_body {
  width: 100%;
  height: 100%;
  padding-top: 70px;
  background-color: #bbc5e8;
}
.btn-block {
  margin-top: 10px;
}
.errorMessage {
  color: red;
}
</style>
