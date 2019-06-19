<template>
  <section>
    <div class="topic_header">
      <h2>{{title}}</h2>
      <div class="changes">
        <span>发布于 10 天前</span>
        <span>
          作者
          <a href="#">atian25</a>
        </span>
        <span>8755 次浏览</span>
        <span>来自 分享</span>
      </div>
      <p v-if="isLoginUser">
        <router-link :to="'/topic/edit/'+forDate.article_id">编辑</router-link>
        <a href="#" @click.prevent="delTopic">删除</a>
      </p>
      <hr>
      <p class="topicContent">{{content}}</p>
    </div>
    <div class="header">
      <span class="col_fade">{{comments.length}} 回复</span>
    </div>
    <div class="cell reply_area reply_item" reply_to_id v-for="item in comments" :key="item.id">
      <div class="author_content">
        <a href="/user/zy445566" class="user_avatar">
          <img src="../common/avatar-default.png" title="zy445566">
        </a>
        <span class="user_info">
          <a class="dark reply_author" href="#">zy445566</a>
          <a class="reply_time" href="#">1楼•10 天前</a>
        </span>
        <span class="user_action">
          <span>
            <i class="glyphicon glyphicon-thumbs-up" title="喜欢"></i>
            <span class="up-count">1</span>
          </span>
        </span>
      </div>
      <div class="reply_content from-zy445566">
        <div class="markdown-text">
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="clearfix">
        <div class="reply2_area"></div>
      </div>
    </div>
    <form class="commentForm" @submit.prevent="createComment">
      <div class="form-group">
        <label for="content">评论</label>
        <textarea
          class="form-control"
          name="content"
          id="content"
          cols="10"
          rows="3"
          required
          v-model="forDate.content"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-default">提交评论</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      isLoginUser: false,
      comments: [],
      forDate: {
        content: "",
        article_id: ""
      }
    };
  },
  created() {
    const params = this.$route.params;
    this.forDate.article_id = params.id;
    this.getTopicById(params.id);
    this.getComments(params.id);
  },
  methods: {
    async getTopicById(id) {
      try {
        const { data: topic } = await axios.get(`/api/topics/${id}`);
        this.title = topic.title;
        this.content = topic.content;
        const { data: session } = await axios.get("/api/session");
        this.isLoginUser = topic.user_id === session.id ? true : false;
      } catch (err) {
        console.log(err);
      }
    },
    async getComments(id) {
      try {
        const { data } = await axios.get(`/api/comments?topic_id=${id}`);
        this.comments = data;
      } catch (err) {
        console.log(err);
      }
    },
    async createComment() {
      try {
        const { data } = await axios.post("/api/comments", this.forDate);
        this.getComments(this.forDate.article_id);
        this.forDate.content = "";
      } catch (err) {
        if (!window.confirm("请先登录")) {
          return;
        } else {
          this.$router.push("/login");
        }
      }
    },
    async delTopic() {
      try {
        if (!window.confirm("确定删除话题吗？")) {
          return;
        } else {
          const res = await axios.delete(
            `/api/topics/${this.forDate.article_id}`
          );
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.user_avatar img,
.user_big_avatar img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
.cell {
  position: relative;
  padding: 10px 0 10px 10px;
  font-size: 14px;
}
#content .changes,
.cell,
.unstyled li div,
.user_name,
a.dark,
a.topic_title {
  overflow: hidden;
}
.user_action {
  float: right;
}
.reply_item {
  border-bottom: 1px solid #ccc;
  margin: 10px;
}
.reply_content {
  margin-top: 10px;
}
.topicContent {
  margin-bottom: 50px;
}
.commentForm {
  padding: 5px;
  margin-top: 10px;
}
</style>

