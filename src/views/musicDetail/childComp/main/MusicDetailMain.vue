<template>
  <el-main class="main">
    <div class="title">
      <div class="title-name">{{currentPlayMusic.name}}</div>
      <div class="title-alias">{{currentPlayMusic.alias}}</div>
      <div class="title-artists">
        <span v-for="(artist,index) of currentPlayMusic.artists"
              :key="artist.id">
          {{artist.name}}
          <span v-if="index!==currentPlayMusic.artists.length-1">/</span>
        </span>
        <span>
          ─ {{currentPlayMusic.album.name}}
        </span>
      </div>
    </div>
    <div class="content">
      <div class="left"></div>
      <div class="center">
        <lyric-roll :lyric="lrc" :tlyric="tlyric" />
      </div>
      <div class="right"></div>
    </div>
  </el-main>
</template>

<script>
import LyricRoll from 'components/common/LyricRoll.vue'

import { mapGetters } from 'vuex'
import { getLyric } from 'network/pageRequest/musicdetail'

export default {
  components: {
    LyricRoll
  },
  data () {
    return {
      lrc: '',
      tlyric: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentPlayMusic',
      'isExistCurrentPlayMusic'
    ])
  },
  methods: {
    getLyric () {
      const musicId = this.currentPlayMusic.id
      getLyric(musicId)
        .then(res => {
          this.lrc = res.lrc.lyric
          this.tlyric = res.tlyric.lyric
          console.log(res)
        })
    }
  },
  created () {
    if (this.isExistCurrentPlayMusic) {
      this.getLyric()
    } else {
      this.$router.replace('/home')
    }
  },
  watch: {
    currentPlayMusic () {
      this.getLyric()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 530px;
  overflow: hidden;
}

.title {
  height: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 3rem;

  &-name {
    color: #333333;
    font-size: var(--font-size-title);
  }

  &-alias {
    color: var(--color-gray);
  }

  &-artists {
    color: var(--color-gray);
  }
}

.content {
  height: 80%;
  display: flex;
}

.left {
  flex: 1;
}
.center {
  flex: 1;
}
.right {
  flex: 1;
}
</style>