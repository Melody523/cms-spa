import VueRouter from 'vue-router'
import Home from './components/home/Home.vue'
import List from './components/home/List.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

import TopicNew from './components/topic/New.vue'
import TopicEdit from './components/topic/Edit.vue'
import TopicDetail from './components/topic/Detail.vue'

import Setting from './components/settings/Setting.vue'
import SettingProfile from './components/settings/Profile.vue'
import SettingAdmin from './components/settings/Admin.vue'

export default new VueRouter ({
    routes: [
        {
            path: '/',
            component:Home,
            children: [
                {
                    path: '',
                    component: List
                },
                {
                    path: '/topic/new',
                    component: TopicNew
                },
                {
                    path: '/topic/edit/:id',
                    component: TopicEdit
                },
                {
                    path: '/topic/detail/:id',
                    component: TopicDetail
                },
                {
                    path: '/settings',
                    component: Setting,
                    children:[
                        {
                            path: '',
                            component: SettingProfile
                        },
                        {
                            path: '/settings/profile',
                            component: SettingProfile
                        },
                        {
                            path: '/settings/admin',
                            component: SettingAdmin
                        }
                    ]
                }
            ]
        },
        {
            path: '/login', component: Login
        },
        {
            path: '/register', component: Register
        }
    ]
})