<template>
  <preview @click.native="songListDetail" @contextmenu.native.prevent="context">
    <template v-slot:left>
      <div v-if="list.highQuality">
        <div class="quality"></div>
        <div class="quality-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-_huangguan"></use>
          </svg>
        </div>
      </div>

      <el-image class="cover" :src="list.coverImgUrl + '?param=100y100'"
                fit="fill" />
    </template>
    <template v-slot:right>
      <el-row class="row" :gutter="20">
        <el-col :span="12" :offset="0">
          {{list.name}}
        </el-col>
        <el-col :span="12" :offset="0">
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <span class="count">{{list.trackCount}}首</span>
            </el-col>
            <el-col :span="7" :offset="0">
              <span class="count">
                <svg class="icon sub-icon" aria-hidden="true">
                  <use xlink:href="#icon-shoucang"></use>
                </svg>
                {{list.bookCount}}
              </span>
            </el-col>

            <el-col :span="10" :offset="0">
              <div>
                <span class="text">by</span>
                &nbsp;
                <span class="creator-name"
                      @click.stop="userDetail">{{list.creator.nickname}}</span>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </template>

    <song-list-context :showContext.sync="showContext" :x.sync="context_x"
                       :y.sync="context_y" :songList="list"
                       v-if="showContext" />
  </preview>
</template>

<script>
import Preview from 'components/content/preview/Preview'
import SongListContext from 'components/content/context/SongListContext'

export default {
  components: { Preview, SongListContext },
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showContext: false,
      context_x: 0,
      context_y: 0
    }
  },
  methods: {
    songListDetail () {
      this.$router.push('/songList/' + this.list.id)
    },

    userDetail () {
      this.$router.push('/user/detail/' + this.list.creator.userId)
    },

    // 上下文菜单
    context (event) {
      if (event.button === 2) { // 如果为右键
        this.showContext = true // 显示上下文菜单
        this.context_x = event.clientX // 传递点击位置
        this.context_y = event.clientY
      }
    }
  }
}
</script>

<style lang="less" scoped>
@height: 100px;
.cover {
  position: relative;
  z-index: 1;
  height: @height;
  width: @height;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  border-right: none;
}

.row {
  width: 100%;
}

.count,
.text {
  color: var(--color-light-gray);
}

.sub-icon {
  vertical-align: -0.1em;
}

.creator-name {
  color: var(--color-gray);
  cursor: pointer;

  &:hover {
    color: black;
  }
}

.quality {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border: 15px solid #f3b068;
  border-color: #f3b068 transparent transparent #f3b068;
  border-top-left-radius: 5px;

  &-icon {
    position: absolute;
    color: white;
    top: 3px;
    left: 3px;
    z-index: 2;
    transform: rotate(-46deg);
    font-size: 12px;
  }
}
</style>