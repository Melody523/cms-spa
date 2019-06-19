<template>
  <div class="editPassword">
    <h3>修改密码</h3>
    <form @submit.prevent.enter="updatePassword">
      <div class="form-group">
        <label for="curPassword">当前密码</label>
        <input type="password" class="form-control" id="curPassword" v-model="forData.password" required>
        <p v-show="checkPassword" class="checkPassword">当前密码有误</p>
      </div>
      <div class="form-group">
        <label for="newPassword">新的密码</label>
        <input type="password" class="form-control" id="newPassword" v-model="newPassword" required>
      </div>
      <div class="form-group">
        <label for="comfirmPassword">确认密码</label>
        <input type="password" class="form-control" id="comfirmPassword" v-model="comfirmPassword" required>
        <p v-show="checkcurPassword" class="checkPassword">新密码和确认密码不一致</p>
      </div>
      <button type="submit" class="btn btn-success">保存</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forData: {
          email: '',
          password: ''
      },
      id: '',
      newPassword: "",
      comfirmPassword: "",
      checkPassword: false,
      checkcurPassword: false
    };
  },
  created () {
      this.getUser()
  },
  methods: {
    async getUser() {
      const { data } = await axios.get("/api/session");
      this.forData.email = data.email
      this.id = data.id
    },
    async updatePassword() {
      try {
          try {
              const { data:session } = await axios.post('/api/session', this.forData)
              this.checkPassword = false
              if ( this.newPassword !== this.comfirmPassword) {
                  this.checkcurPassword = true
                  return 
              }
              this.checkcurPassword = false
              this.forData.password = this.newPassword
              const { data:user } = await axios.patch(`/api/users/${this.id}`, this.forData)
              this.$router.push('/')
          } catch (err) {
              this.checkPassword = true
              console.log(err)
          }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.editPassword {
  width: 400px;
  position: absolute;
  left: 320px;
  top: 60px;
}
label {
  font-size: 12px;
}
.checkPassword{
    color: red;
    font-size: 12px;
}
</style>


