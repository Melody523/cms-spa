<template>
    <router-view></router-view>
</template>

<script>
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'
import Home from './components/home/Home.vue'
export default {
    data () {
        return {
            
        }
    },
    components: {
        Login,
        Register,
        Home
    }
}
</script>

<style scoped>
    
</style>


