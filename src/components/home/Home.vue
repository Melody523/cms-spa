<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <List></List> -->
    <Footer></Footer> 
  </div>
</template>

<script>
import Header from "../settings/Header.vue";
import Footer from "../settings/Footer.vue";
import '../common/index.css'
export default {
  // async beforeRouteEnter (to, from, next) {
  //   try {
  //     const { data } = await axios.get("/api/session");
  //     next(vm => {
  //         vm.user = data
  //         console.log(data)
  //     })
  //   } catch (err) {
  //     console.log(err)
  //     next()
  //   }   
  // },
  data() {
    return {
      
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
html,
body {
  background-color: #fff;
}
#app{
    padding-top: 60px;
    padding-bottom: 30px;
}
</style>


