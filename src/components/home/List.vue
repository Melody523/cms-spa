<template>
  <section>
    <ul class="media-list">
      <li class="media" v-for="item in topics" :key="item.id">
        <div class="media-left">
          <a href="#">
            <img
              width="50"
              height="50"
              class="media-object"
              src="../common/avatar-default.png"
              alt="..."
            >
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            <router-link :to="'/topic/detail/'+item.id">{{item.title}}</router-link>
          </h4>
          <p class="media-comment">sueysok 回复了问题 • 2 人关注 • 1 个回复 • 187 次浏览 • 2017-10-20 13:45</p>
        </div>
      </li>
    </ul>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      totalCount: 0,
      currentPage4: 1,
      curPage: 1,
      curpageSize: 5
    };
  },
  created() {
    this.getTopics(this.curPage, this.curpageSize);
  },
  methods: {
    async getTopics(page, pageSize) {
      const { data } = await axios.get(
        `/api/topics/?_page=${page}&_limit=${pageSize}`
      );
      this.topics = data.topics;
      this.totalCount = data.count;
    },
    handleSizeChange(pageSize) {
      this.curpageSize = pageSize;
      this.getTopics(this.curPage, this.curpageSize);
    },

    handleCurrentChange(page) {
      this.curPage = page;
      this.getTopics(this.curPage, this.curpageSize);
      //   console.log(this.pageSize);
    }
  }
};
</script>

<style>
section {
  margin: 0 80px;
}
.media-comment{
    font-size: 12px;
}
.media-heading{
    font-size: 16px;
}
</style>

