<template>
  <div class="search">
    <el-popover popper-class="search-popover" ref="popover"
                placement="bottom-start" width="350" trigger="focus"
                v-model="popperVisible">
      <hot-search :hotSearch="hotSearch" :height="350"
                  @searchKeywords="searchKeywords" v-show="isHot" />

      <keyword-search :keywords="searchText">
        <search-suggest :suggest="suggest" :height="350" v-show="!isHot"
                        @close="closePopper" />
      </keyword-search>

    </el-popover>

    <form @submit.prevent="search">
      <el-input class="serch-input" :class="{'search-round':round}"
                placeholder="请输入歌名、歌词、歌手或专辑" prefix-icon="el-icon-search"
                v-model="searchText" @focus="inputFocus" @input="debounceInput"
                v-popover:popover />
    </form>
  </div>
</template>

<script>
import hotSearch from './hotSearch.vue'
import SearchSuggest from './SearchSuggest.vue'
import KeywordSearch from 'components/common/keywordSearch/KeywordSearch.vue'

import { searchDefault, searchHot, searchSuggest } from 'network/common/search'
import { debounce } from 'common/utils'

export default {
  components: { hotSearch, SearchSuggest, KeywordSearch },
  props: {
    round: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      hotSearch: [],
      suggest: {},

      popperVisible: false, // popper是否可见
      isHot: true, // 是否显示热门
      requestSuggest: true, // 是否可以请求搜索建议
      debounceInput: null
    }
  },
  methods: {
    // * 网络请求
    search () {
      if (this.searchText.length === 0) {
        this.$notify.topleft('请输入您要搜索的关键字', 'error')
        return
      }

      this.$router.push({
        path: '/search/1',
        query: {
          keywords: this.searchText
        }
      })
      this.closePopper() // 执行搜索后关闭

      this.requestSuggest = false // 不再请求建议
      setTimeout(() => {
        this.requestSuggest = true
      }, 500) // 500ms后恢复
    },

    searchDefault () {
      searchDefault().then(res => {
        console.log('默认关键字为：', res)
      })
    },

    searchHot () {
      searchHot().then(res => {
        // console.log('热门搜索为：', res)
        if (res.code === 200) {
          this.showHot() // 搜索完成显示热门搜索
          this.showPopper() // 得到结果之后显示Popper
          this.hotSearch = res.data
        } else {
          this.closePopper() // 若没有搜索建议,关闭
        }
      })
    },

    searchSuggest () {
      if (!this.requestSuggest) return
      searchSuggest(this.searchText).then(res => {
        // console.log(`${this.searchText}搜索建议为:`, JSON.parse(JSON.stringify(res)))
        if (res.code === 200) {
          if (Object.keys(res.result).length !== 0) {
            this.hideHot() // 搜索完成显示搜索建议
            this.showPopper() // 得到结果之后显示Popper
            this.suggest = res.result
          } else {
            this.closePopper() // 若没有搜索建议,关闭
          }
        }
      })
    },

    // * 事件处理
    searchKeywords (word) {
      this.searchText = word
      this.search()
    },

    inputFocus (event) {
      console.log('event: ', event)
      console.log('search获取焦点')
      if (this.searchText.length === 0) {
        this.searchHot() // 没有输入内容则获取热门搜索
      } else {
        this.searchSuggest() // 有内容就获取搜索建议
      }
    },

    input (value) {
      if (value.length === 0) {
        this.searchHot() // 输入为空的时候,请求热门
      } else {
        this.searchSuggest() // 非空:防抖后的建议查找
      }
    },

    closePopper () {
      this.popperVisible = false
    },

    showPopper () {
      this.popperVisible = true
    },

    hideHot () {
      this.isHot = false
    },

    showHot () {
      this.isHot = true
    }
  },
  mounted () {
    this.debounceInput = debounce(this.input, 300)
  }

}
</script>

<style lang="less" scoped>
.popover {
  padding-right: 0 !important;
}
</style>

<style lang="less">
.search-round {
  & > .el-input__inner {
    border-radius: 20px;
  }
}

.search-popover {
  // padding-right: 0 !important;
  // padding-left: 0 !important;
  padding: 0 !important;
}
</style>