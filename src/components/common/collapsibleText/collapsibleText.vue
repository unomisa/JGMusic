<template>
  <div class="line">
    <div class="text" ref="text">
      <slot></slot>
      <div ref="textCopy" class="copy">
        <slot></slot>
      </div>
    </div>
    <div class="unfold-icon" v-if="isOverflow" @click="unfold">
      <i :class='descIconClass'></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      textCopy: null,
      descUnfold: false
    }
  },
  computed: {
    isOverflow () {
      if (this.text && this.textCopy) {
        return this.textCopy.clientWidth > this.text.clientWidth
      } else {
        return false
      }
    },

    descIconClass () {
      return {
        'el-icon-caret-bottom': !this.descUnfold,
        'el-icon-caret-top': this.descUnfold
      }
    }
  },
  methods: {
    unfold () {
      if (this.descUnfold) {
        this.text.style.whiteSpace = 'nowrap'
      } else {
        this.text.style.whiteSpace = 'initial'
      }
      this.descUnfold = !this.descUnfold
    }
  },
  mounted () {
    this.text = this.$refs.text
    this.textCopy = this.$refs.textCopy
  }
}
</script>

<style lang="less" scoped>
.line {
  position: relative;
  line-height: 1.5;
}

.unfold-icon {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
}

.copy {
  position: absolute;
  visibility: hidden;
}

.text {
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  text-align: justify;
}
</style>