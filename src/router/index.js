import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Search = () => import('views/searchResult/searchResult')
const SearchSong = () => import('views/searchResult/childComp/SearchSong')
const SearchAlbum = () => import('views/searchResult/childComp/SearchAlbum')
const SearchArtist = () => import('views/searchResult/childComp/SearchArtist')
const SearchSonglist = () => import('views/searchResult/childComp/SearchSonglist')
const SearchUser = () => import('views/searchResult/childComp/SearchUser')

const Home = () => import('views/home/Home')
const MusicDetail = () => import('views/musicDetail/MusicDetail')

const User = () => import('views/user/User')
const UserDetail = () => import('views/user/userDetail/UserDetail')
const UserFollow = () => import('views/user/userFollow/UserFollow')
const UserSub = () => import('views/user/userSub/UserSub')
const UserSubArtist = () => import('views/user/userSub/chidView/UserSubArtist')
const UserSubAlbum = () => import('views/user/userSub/chidView/UserSubAlbum')

const SongListDetail = () => import('views/songListDetail/SongListDetail')
const AlbumDetail = () => import('views/albumDetail/AlbumDetail')
const Artist = () => import('views/artist/Artist')
const ArtistDetail = () => import('views/artistDetail/Artist')
const RankList = () => import('views/rankList/RankList')
const SongList = () => import('views/songList/Songlist')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: '1',
        component: SearchSong,
        meta: {
          type: '1'
        }
      },
      {
        path: '10',
        component: SearchAlbum,
        meta: {
          type: '10'
        }
      },
      {
        path: '100',
        component: SearchArtist,
        meta: {
          type: '100'
        }
      },
      {
        path: '1000',
        component: SearchSonglist,
        meta: {
          type: '1000'
        }
      },
      {
        path: '1002',
        component: SearchUser,
        meta: {
          type: '1002'
        }
      }
    ]
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
    path: '/user',
    component: User,
    children: [
      {
        path: 'detail/:userId',
        component: UserDetail
      },
      {
        name: 'userFollow',
        path: 'follow/:userId',
        component: UserFollow
      },
      {
        path: 'sub',
        component: UserSub,
        children: [
          {
            path: '',
            redirect: '/user/sub/artist'
          },
          {
            path: 'artist',
            component: UserSubArtist

          },
          {
            path: 'album',
            component: UserSubAlbum
          }
        ]
      }
    ]
  },
  {
    path: '/songList/:id',
    component: SongListDetail
  },
  {
    path: '/songList',
    component: SongList
  },
  {
    path: '/album/:id',
    component: AlbumDetail
  },
  {
    path: '/artist',
    component: Artist
  },
  {
    path: '/artistDetail/:id',
    component: ArtistDetail
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
