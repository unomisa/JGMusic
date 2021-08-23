import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const MusicDetail = () => import('views/musicDetail/MusicDetail')
const UserDetail = () => import('views/userDetail/UserDetail')
const SongListDetail = () => import('views/songListDetail/SongListDetail')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/musicDetail',
    component: MusicDetail
  },
  {
    path: '/userDetail/:userId',
    component: UserDetail
  },
  {
    path: '/songList/:id',
    component: SongListDetail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
