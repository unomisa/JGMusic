<template>
  <nav-bar>
    <template v-slot:center>
      <el-col :span="12" :offset="0">
        <el-input class="detail-search-input" placeholder="搜索"
                  prefix-icon="el-icon-search" v-model="searchText">
        </el-input>
      </el-col>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/content/navBar/NavBar.vue'
export default {
  components: { NavBar },
  data () {
    return {
      searchText: ''
    }
  }
}
</script>

<style lang="less" scoped>
.detail-search-input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}
</style>

<style lang="less">
.detail-search-input {
  & > input {
    border-radius: 20px;
  }
}
</style>