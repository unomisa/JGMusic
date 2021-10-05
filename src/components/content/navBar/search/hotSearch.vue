<template>
  <div v-bar class="hotsearch" :style="hotHeight">
    <div>
      <div class="keywords" v-for="(keywords,index) in hotSearch"
           :key="keywords.searchWord"
           @click="searchKeywords(keywords.searchWord)">

        <div class="keywords-left">
          <span class="index"
                :class="{'index-top': index < 3}">{{index+1}}</span>
        </div>
        <div class="keywords-right">
          <div>
            <span class="searchword"
                  :class="{weight: index<3}">{{keywords.searchWord}}</span>
            <el-image class="icon" :src="keywords.iconUrl + '?param=50y50'"
                      fit="contain" v-if="keywords.iconUrl" />
            <span class="score">{{keywords.score}}</span>
          </div>
          <div class="content">{{keywords.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotSearch: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hotHeight () {
      return {
        height: this.height + 'px'
      }
    }
  },
  methods: {
    searchKeywords (word) {
      this.$emit('searchKeywords', word)
    }
  }
}
</script>

<style lang="less" scoped>
// .hotsearch {
//   height: 350px;
// }

.title {
  font-size: 16px;
  color: var(--color-main);
}

.keywords {
  display: flex;
  height: 60px;
  // padding-right: 1rem;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #fbebf4;
  }

  &-left {
    flex: 40px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
  }

  &-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}

.index {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-light-gray);

  &-top {
    color: var(--color-main);
  }
}

.weight {
  font-weight: bold;
}

.searchword {
  margin-right: 0.5rem;
}

.icon {
  height: 13px;
  width: 30px;
  margin-right: 0.5rem;
}

.score {
  font-size: 12px;
  color: var(--color-light-gray);
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>