import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../view/Login.vue'
import Header from '../components/TopBar.vue'
import Menu from '../components/Menu.vue'
import Nav from '../components/Nav.vue'

const create_component = (name:string) => {
    let Main = () => import(`../view/${name}.vue`)
    let component = {
        Main,
        Header,
        Menu,
        Nav
    }
    return component
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        component: Login
        // components: {
        //     Main: () => import('../view/Login.vue'),
        // }

    },
    {
        path: '/User',
        components: create_component('User')

    },
    {
        path: '/Home',
        // components: {
        //     Main: () => import('../view/Home.vue'),
        //     Header,
        //     Menu,
        //     Nav
        // }
        components: create_component('Home')
    },
    {
        path: '/About',
        name: 'About',
        // components: {
        //     Main: () => import('../view/About.vue'),
        //     Header,
        //     Menu,
        //     Nav
        // }
        components: create_component('About')
    },
    {
        path: '/Move',
        name: 'Move',
        component: () => import('../view/Move.vue')
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    // 与vite.config.ts中的base一致（hash模式下不需要）
    // 且后端nginx也要配置
    /*
    location /dist {
        root   html;
        index  index.html index.htm;
        try_files $uri $uri/ /dist/index.html;
    }
    */
    // history: createWebHistory('./'),
    routes
})

export default router