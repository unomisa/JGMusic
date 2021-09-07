<template>
  <div class="desc">
    <div class="section">
      <div class="title">歌手介绍</div>
      <div class="brief-desc">{{artistDesc.briefDesc}}</div>
    </div>

    <div class="section" v-for="(item,index) in artistDesc.introduction"
         :key="index">
      <div class="title">{{item.ti}}</div>
      <pre class="txt">{{item.txt}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artistDesc: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.desc {
  line-height: 2;
}

.brief-desc {
  text-indent: 2em;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.section {
  margin-bottom: 50px;
}

.txt {
  padding-left: 2rem;
}
</style>