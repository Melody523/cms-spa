<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">用户设置</li>
      <li class="list-group-item" :class="{Active:showActive}">
        <router-link to="/settings/profile" >基本信息</router-link>
      </li>
      <li class="list-group-item" :class="{Active:!showActive}">
        <router-link to="/settings/admin">账户设置</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    computed: {
        showActive () {
            return this.$route.path === '/settings/profile'|| this.$route.path === '/settings'  
        }
    }
};
</script>

<style scoped>
.list-group {
  width: 200px;
  margin-left: 80px;
  margin-top: 20px;
}
.list-group .list-group-item a {
  color: #555;
  display: block;
  width: 200px；;
}
.list-group .list-group-item {
  line-height: 14px;
}
.list-group .list-group-item:first-child,
.list-group .list-group-item:nth-child(2) {
  border-bottom: none;
}
.list-group .list-group-item:first-child {
  background-color: #eee;
}
.Active{
    border: 1px solid #ccc;
    background-color:lightblue;
    color: #fff;
}
</style>
