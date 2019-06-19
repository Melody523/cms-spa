<template>
  <div id="html_body">
    <div id="app" class="container">
      <a href="/">
        <img src="../common/logo.jpg" alt id="logo">
      </a>
      <h2 class="form-signin-heading">用户登录</h2>
      <form class="form-signin" @submit.prevent.enter="loginHandler">
        <label for="inputEmail" class="sr-only">邮箱</label>
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
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> 记住我
          </label>
        </div>
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          id="login"
        >登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
      </form>
      <div class="create">
        <span>没有账号？</span>
        <router-link to="/register">点击创建</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "../common/user.css";
export default {
  data() {
    return {
      forData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginHandler: _.debounce(async function () {
        try {
            const {data} = await axios.post('api/session', this.forData)
            // this.$router.push('/')
            this.$router.back()
        } catch (err) {
            window.alert('邮箱或密码有误')
        } 
    }, 1000)
  }
};
</script>

<style scoped>
#html_body {
  width: 100%;
  height: 100%;
  padding-top: 70px;
  background-color: #bbc5e8;
}
</style>


