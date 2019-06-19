<template>
  <header>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">
            <img src="../common/logo.jpg" alt id="logoPage">
          </router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <div class="login_register">
            <template v-if="nickname">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @click="show = !show"
                >
                  <span>当前登陆用户:{{nickname}}</span>
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" :style="{display:show ? 'block' : 'none'}">
                  <li>
                    <router-link to="/settings">个人中心</router-link>
                  </li>
                  <li>
                    <router-link to="/topic/new">发布主题</router-link>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="#" @click.prevent="logout">退出</a>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-success">登录</router-link>
              <router-link to="/register" class="btn btn-info">注册</router-link>
            </template>
          </div>
          <input type="text" class="search" placeholder="Search">
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      nickname: ""
    };
  },
  created() {
    this.getUser()
  },
  methods: {
    async logout() {
      try {
        const res = await axios.delete(`/api/session`);
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
    async getUser() {
      try {
        const {data} = await axios.get("/api/session");
        this.nickname = data.nickname;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.navbar-inverse .navbar-collapse,
.navbar-inverse {
  background-color: #bbc5e8;
  border: none;
}
.navbar-inverse .navbar-toggle {
  border-color: #fff;
}
.btn {
  font-size: 12px;
}
.dropdown-toggle {
  width: 150px;
  text-align: left;
}
.caret {
  text-align: right;
}
</style>
