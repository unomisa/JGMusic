<template>
  <div v-if="showSaveMusic">
    <el-card class="save-music" shadow="always" :body-style="bodyStyle">
      <div class="top-box">
        <div class="title">收藏到歌单</div>

        <div class="add-newlist" @click="showCreateInput">
          <div class="add-left">
            <div class="add-cover">
              <i class="el-icon-plus "></i>
            </div>
          </div>
          <div class="add-right">
            <div class="desc" v-if="showDesc">
              添加至新歌单
            </div>
            <transition name="el-fade-in-linear">
              <div class="create-input" v-if="!showDesc">
                <el-input class="name-input" v-model="newSongListname"
                          size="small" placeholder="新建歌单名"></el-input>
                <el-button type="primary" size="mini" @click="createSongList">
                  创建
                </el-button>
              </div>
            </transition>
          </div>
        </div>

        <div class="close" @click="reset"><i
             class="el-icon-close close-icon"></i></div>
      </div>

      <div class="scroll-content" v-bar>
        <div>
          <div class="lists">
            <div class="list" v-for="list in createPlaylist" :key="list.id"
                 @click="saveMusic(list)">
              <div class="list-left">
                <el-image class="cover" :src="list.coverImgUrl + '?param=80y80'"
                          fit="fill">
                </el-image>
              </div>
              <div class="list-right">
                <div class="name">{{list.name}}</div>
                <div class="count">{{list.trackCount}}首音乐</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { playlistManagement, SongList } from 'network/common'
import { updateUserPlaylist } from 'common/mixin' // 更新用户歌单信息
import { createSongList } from 'network/pageRequest/songList'

export default {
  mixins: [updateUserPlaylist],
  data () {
    return {
      showSaveMusic: false,
      mid: null,
      newSongListname: '', // 想创建的歌单名
      showDesc: true
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    bodyStyle () {
      return {
        padding: '20px',
        height: '100%',
        'box-sizing': 'border-box',
        display: 'flex',
        'flex-direction': 'column',
        'padding-right': '0'
      }
    },

    createPlaylist () {
      if ('subList' in this.loginUser) {
        return Array.from(this.loginUser.subList.values()).filter(list => !list.subscribed)
      } else {
        return []
      }
    }
  },
  methods: {
    init (mid) {
      console.log('显示收藏歌单列表')
      this.mid = mid
      this.showSaveMusic = true
      this.newSongListname = ''
    },

    reset () {
      this.mid = null
      this.showSaveMusic = false
    },

    saveMusic (list) {
      playlistManagement('add', list.id, this.mid).then(res => {
        if (res.body.code === 200) {
          this.$notify.topleft('添加至歌单成功')
          this.getUserPlaylist() // > mixin中的更新用户歌单方法
        } else {
          const message = res.body.message
          this.$notify.topleft(message, 'error')
        }
      })
      this.reset()
    },

    showCreateInput () {
      this.showDesc = false
    },

    // * 网络请求
    createSongList () {
      createSongList(this.newSongListname).then(res => {
        const list = new SongList(res.playlist)
        this.saveMusic(list)
      })
    }
  },
  created () {
    this.$bus.$on('subMusicToList', this.init)
  }
}
</script>

<style lang="less" scoped>
.save-music {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 510px;
  background-color: white;
  user-select: none;
}

.top-box {
  flex: 120px 0;
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  right: 5px;
  top: 5px;

  &-icon {
    padding: 5px;
    font-size: 20px;
    color: var(--color-gray);
    cursor: pointer;
    background-color: #fbebf4;
    border-radius: 100%;

    &:hover {
      color: #d83993;
    }
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.add {
  &-newlist {
    display: flex;
    align-items: center;
    height: 0;
    flex: 1;
    margin-right: 20px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border-radius: 5px;
      background-color: #fbebf4;
    }

    &:hover .add-cover {
      background-color: white;
    }
  }

  &-left {
    width: 0;
    flex: 70px 0;
    margin-right: 1rem;
    padding-left: 10px;
  }

  &-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eeeff1;
    height: 70px;
    width: 70px;
    border-radius: 5px;
    font-size: 2rem;
    color: var(--color-main);
  }

  &-right {
    display: flex;
    flex-direction: column;
    width: 0;
    flex: 1;
  }
}

.name-input {
  width: 90%;
  margin-bottom: 8px;
}

.desc {
}

.create-input {
}

.scroll-content {
  flex: 1;
  height: 100%;
}

.list {
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 90px;

  &:hover {
    border-radius: 5px;
    background-color: #fbebf4;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &s {
    background-color: white;
    margin-right: 20px;
  }

  &-left {
    flex: 70px 0;
    margin-right: 1rem;
    width: 0;
    height: 70px;
    padding-left: 10px;
  }

  &-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    width: 0;
    line-height: 2;
  }
}

.cover {
  border-radius: 5px;
  border: 1px solid #f0f2f2;
}

.count {
  font-size: 13px;
  color: var(--color-gray);
}

.name {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>