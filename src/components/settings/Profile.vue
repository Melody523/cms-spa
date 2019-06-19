<template>
  <div>
    <div class="Profile">
      <form @submit.prevent.enter="updateUser">
        <div class="form-group">
          <label for="email">账号</label>
          <p>{{user.email}}</p>
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" class="form-control" id="email" v-model="user.email">
        </div>
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input type="text" class="form-control" id="nickname" v-model="user.nickname">
        </div>
        <div class="form-group">
          <label class="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="0"
              v-model="picked"
            > 男
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="1"
              v-model="picked"
            > 女
          </label>
        </div>
        <div class="avatar">
          <img src="../common/avatar-default.png" alt>
          <input
            type="file"
            name="file"
            id="file"
            class="inputfile"
            accept="image/png, image/jpeg, image/gif, image/jpg"
          >
          <label for="file" class="btn btn-default">Update new picture</label>
        </div>
        <button type="submit" class="btn btn-success">保存</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      picked: ""
    };
  },
  created: function () {
    this.getUser()
  },
  methods: {
    async getUser() {
      const { data } = await axios.get("/api/session");
      this.user = data;
      this.picked = data.gender;
    },
    async updateUser() {
      try {
        this.user.gender = parseInt(this.picked);
        this.user.password = null;
        const { data: curUser } = await axios.patch(
          `/api/users/${this.user.id}`,
          this.user
        );
        
        this.user = curUser;
        console.log(this.user)
        this.$router.push('/login')
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.Profile {
  width: 350px;
  position: absolute;
  left: 320px;
  top: 80px;
}
label {
  font-size: 12px;
}
.inputfile {
  opacity: 0;
}
.avatar {
  position: absolute;
  right: -300px;
  top: 0;
}
img {
  margin-left: 10px;
}
</style>


