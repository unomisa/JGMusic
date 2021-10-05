<template>
  <div ref="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    keywords: {
      type: String,
      default: null
    }
  },
  methods: {
    /**
     * 高亮关键字
     * @param node 节点
     * @param pattern 匹配的正则表达式
     * @param index - 可选。本项目中特定的需求，表示第几组关键词
     * @returns exposeCount - 露出次数
    */
    highlightKeyword (node, pattern, index) {
      let exposeCount = 0
      if (node.nodeType === 3) {
        const matchResult = node.data.match(pattern)
        if (matchResult) {
          const highlightEl = document.createElement('span')
          highlightEl.dataset.highlight = 'yes'
          highlightEl.dataset.highlightMatch = matchResult[0];
          (index === null) || (highlightEl.dataset.highlightIndex = index)
          const matchNode = node.splitText(matchResult.index)
          matchNode.splitText(matchResult[0].length)
          const highlightTextNode = document.createTextNode(matchNode.data)
          highlightEl.appendChild(highlightTextNode)
          matchNode.parentNode.replaceChild(highlightEl, matchNode)
          exposeCount++
        }
      } else if ((node.nodeType === 1) && !(/script|style/.test(node.tagName.toLowerCase()))) { // 具体条件自己加，这里是基础条件
        if (node.dataset.highlight === 'yes') {
          if (index == null) {
            return
          }
          if (node.dataset.highlightIndex === index.toString()) {
            return
          }
        }
        const childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
          this.highlightKeyword(childNodes[i], pattern, index)
        }
      }
      return exposeCount
    },

    /**
   * @param {String | Array} keywords - 要高亮的关键词或关键词数组
   * @returns {Array}
   */
    hanldeKeyword (keywords) {
      let wordMatchString = ''
      const words = [].concat(keywords)
      words.forEach(item => {
        const transformString = item.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&')
        wordMatchString += `|(${transformString})`
      })
      wordMatchString = wordMatchString.substring(1)
      // 用于再次高亮与关闭的关键字作为一个整体的匹配正则
      const wholePattern = new RegExp(`^${wordMatchString}$`, 'i')
      // 用于第一次高亮的关键字匹配正则
      const pattern = new RegExp(wordMatchString, 'i')
      return [pattern, wholePattern]
    }
  },
  updated () {
    if (this.keywords) {
      // console.log('布局改变...，尝试添加关键字样式')
      const patterns = this.hanldeKeyword(this.keywords)

      const children = this.$refs.content.childNodes // 针对元素内容进行高亮
      for (let i = 0; i < children.length; i++) {
        this.highlightKeyword(children[i], patterns[0])
      }
    }
  }
}
</script>

<style lang="less">
[data-highlight="yes"] {
  color: #507daf;
}
</style>