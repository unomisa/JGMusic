import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home')
const MusicDetail = () => import('views/musicDetail/MusicDetail')
const UserDetail = () => import('views/userDetail/UserDetail')
const SongListDetail = () => import('views/songListDetail/SongListDetail')
const AlbumDetail = () => import('views/albumDetail/AlbumDetail')
const Artist = () => import('views/artistDetail/Artist')
const RankList = () => import('views/rankList/RankList')

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
  },
  {
    path: '/album/:id',
    component: AlbumDetail
  },
  {
    path: '/artistDetail/:id',
    component: Artist
  },
  {
    path: '/rankList',
    component: RankList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
