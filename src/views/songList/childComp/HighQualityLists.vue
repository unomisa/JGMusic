<template>
  <div class="lists">
    <high-quality-list class="list" :list="list" v-for="(list,index) in  lists"
                       :key="index" />
  </div>
</template>

<script>
import HighQualityList from './HighQualityList.vue'
export default {
  components: { HighQualityList },
  props: {
    lists: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lists {
  display: flex;
  flex-wrap: wrap;
}

.list {
  flex: 32% 0;
  margin-right: 2%;
  margin-bottom: 2rem;

  &:nth-child(3n) {
    margin-right: 0;
  }
}
</style>