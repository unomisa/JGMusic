<template>
  <div class="container">
    <div>
      <span class="title">
        <span>创建的歌单</span>
        <span class="number">({{created.length}})</span>
      </span>

      <span class="create" v-if="isMyProfile" @click="showDialog">
        <i class="el-icon-plus"></i>
      </span>

      <create-song-list-dialog :dialogVisible.sync="dialogVisible" />
    </div>

    <list-skeleton :loading="loading">
      <div>
        <div class="song-lists">
          <song-list class="song-list" :songList="list"
                     v-for="(list,index) in created" :key="index" />
        </div>
      </div>
    </list-skeleton>

    <div class="title" v-if="subscribed.length>0">
      收藏的歌单
      <span class="number">({{subscribed.length}})</span>
    </div>

    <list-skeleton :loading="loading">
      <div>
        <div class="song-lists">
          <song-list class="song-list" :songList="list"
                     v-for="(list,index) in subscribed" :key="index" />
        </div>
      </div>
    </list-skeleton>

  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList'
import ListSkeleton from 'components/content/skeleton/ListsSkeleton'
import CreateSongListDialog from './CreateSongListDialog.vue'
import { mapState } from 'vuex'

export default {
  components: { SongList, ListSkeleton, CreateSongListDialog },
  props: {
    created: {
      type: Array,
      default () {
        return []
      }
    },
    subscribed: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapState([
      'loginUser'
    ]),

    isMyProfile () {
      const userId = parseInt(this.$route.params.userId)
      return userId === this.loginUser.userId
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    }
  }
}

</script>

<style lang="less" scoped>
.container {
  margin-top: 3rem;
}

.number {
  font-size: 18px;
  letter-spacing: 1px;
}

.title {
  position: relative;
  font-size: 28px;
  margin-right: 0.5rem;
}

.create {
  display: inline-block;
  font-size: 28px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    color: var(--color-main);
    transform: rotate(180deg);
  }
}

@listWidth: 200px;
.song-list {
  width: @listWidth;
  margin-right: calc((100% - (@listWidth * 5)) / 4);
  margin-bottom: 2rem;

  &:nth-child(5n) {
    margin: 0;
  }

  &s {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
}
</style>