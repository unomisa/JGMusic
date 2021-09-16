<template>
  <div class="list-tags" @click.stop="stop">
    <span class="el-dropdown-link">
      <el-button round :plain="true" @click="setShowTags">
        {{tag}}
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </span>

    <span class="right right-title"
          v-if="'type' in this.$route.query && this.$route.query.type === 'hightQuality'">精品歌单</span>

    <transition name="el-zoom-in-top">
      <el-card class="card" :body-style="{ padding: '20px' }" v-show="showTags">
        <div slot="header">
          <span>
            <div class="all" @click="selectTag('全部歌单')">
              <el-button type="primary" plain> 全部歌单</el-button>
            </div>
          </span>
        </div>
        <div class="categories" :class="{'mb-0': index === tags.length-1}"
             v-for="(categories,index) in tags" :key="index">
          <div class="categorie" v-if="index===0 && tags.length>1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuyan"></use>
            </svg>
            语种
          </div>
          <div class="categorie" v-if="index===1 && tags.length>1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenleiorguangchangorqita"></use>
            </svg>
            风格
          </div>
          <div class="categorie" v-if="index===2 && tags.length>1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-coffee"></use>
            </svg>
            场景
          </div>
          <div class="categorie" v-if="index===3 && tags.length>1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qingganfenxi-"></use>
            </svg>
            情感
          </div>
          <div class="categorie" v-if="index===4 && tags.length>1">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhuti"></use>
            </svg>
            主题
          </div>

          <div class="tags">
            <div class="tag" v-for="categorie in categories"
                 :key='categorie.name' @click="selectTag(categorie.name)">
              <span :class="{select: tag===categorie.name}">
                <span>
                  {{categorie.name}}
                </span>
                <span v-if="categorie.hot">
                  <svg class="icon hot-icon" aria-hidden="true">
                    <use xlink:href="#icon-remen"></use>
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    tag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showTags: false
    }
  },
  methods: {
    stop () { },
    selectTag (tag) {
      if ('type' in this.$route.query && this.$route.query.type === 'hightQuality') {
        this.$router.push({
          path: '/songList',
          query: {
            tag,
            type: 'hightQuality'
          }
        })
      } else {
        this.$router.push({
          path: '/songList',
          query: {
            tag
          }
        })
      }

      this.setShowTags()
    },

    setShowTags () {
      this.showTags = !this.showTags
    }
  },
  watch: {
    showTags (value) {
      if (value) { // 显示时添加
        document.body.addEventListener('click', this.setShowTags)
      } else { // 不显示时移除
        document.body.removeEventListener('click', this.setShowTags)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-tags {
  position: relative;
  // display: inline-block;
  user-select: none;
  margin: 1rem 0 14px 0;
}

.right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  &-title {
    font-size: 24px;
    font-weight: bold;
  }
}

.card {
  position: absolute;
  z-index: 3;
  margin-top: 1rem;
  width: 800px;
  font-size: 14px;
}

.categorie {
  font-size: 18px;
  color: var(--color-light-gray);
  flex: 1;
  width: 0;

  &s {
    display: flex;
    margin-bottom: 1.5rem;
  }
}

.tag {
  position: relative;
  flex: 15% 0;
  margin-bottom: 16px;
  margin-right: 2%;
  cursor: pointer;

  &-item {
    padding: 0;
    line-height: initial;

    &:hover {
      background-color: initial;
    }
  }

  &:hover {
    color: var(--color-main);
  }

  &:nth-child(6n) {
    margin-right: 0;
  }

  &s {
    flex: 5;
    width: 0;
    display: flex;
    flex-wrap: wrap;
  }
}

.hot-icon {
  font-size: 12px;
  color: var(--color-main);
}

.mb-0 {
  margin-bottom: 0;
}

.divider {
  margin: 1rem 0;
}

.all {
  display: inline-block;
  font-size: 16px;
}

.select {
  background-color: #fce4f9;
  padding: 3px 8px;
  border-radius: 3px;
}
</style>
