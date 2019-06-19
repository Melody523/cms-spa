<template>
  <form @submit.prevent="createTopic">
    <div class="form-group">
      <label for="chooseType">选择模块</label>
      <select class="form-control" required>
        <option>分享</option>
        <option>问答</option>
        <option>招聘</option>
        <option>客户端测试</option>
      </select>
    </div>
    <div class="form-group">
      <label for="title">标题</label>
      <input type="text" class="form-control" id="title" required v-model="forData.title">
    </div>
    <div class="form-group">
      <label for="content">内容</label>
      <textarea
        class="form-control"
        name="content"
        id="content"
        cols="30"
        rows="10"
        required
        v-model="forData.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      forData: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async createTopic() {
      try {
        const { data } = await axios.post("/api/topics", this.forData);
        this.$router.push(`/topic/detail/${data.id}`)
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 20px 80px;
}
.form-control {
  width: 400px;
}
</style>


