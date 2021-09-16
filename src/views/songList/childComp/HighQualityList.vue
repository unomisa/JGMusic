<template>
  <div class="list">
    <div class="list-left">
      <song-list :imgHeight="150" :songList="list" :showText="false" />
    </div>
    <div class="list-right">
      <div class="name">{{list.name}}</div>
      <div class="creator">
        by&nbsp;
        <el-link :underline="false" class="creator-name" @click="userDetail">
          {{list.creator.name}}
        </el-link>
        <el-image class="identity-icon"
                  :src="list.creator.identityIconUrl+ '?param=30y30'" fit="fill"
                  v-if="list.creator.identityIconUrl" />
      </div>
      <div class="copywriter">{{list.copywriter}}</div>
    </div>
  </div>
</template>

<script>
import SongList from 'components/content/preview/SongList.vue'

export default {
  components: { SongList },
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    userDetail () {
      this.$router.push('/userDetail/' + this.list.creator.userId)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;

  &-left {
    flex: 160px 0;
    width: 0;
  }

  &-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 3;
    font-size: 14px;
  }
}

.omit,
.name,
.copywriter,
.creator {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name {
}

.creator {
  color: var(--color-gray);
  font-size: 13px !important;

  &-name {
    font-size: 13px !important;
    vertical-align: top;
  }
}

.copywriter {
  color: var(--color-light-gray);
  font-size: 12px;
}

.identity-icon {
  height: 1rem;
  width: 1rem;
  vertical-align: text-top;
  margin-left: 3px;
}
</style>