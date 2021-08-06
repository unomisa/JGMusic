<template>
  <el-header>
    <nav-bar>
      <template v-slot:center>
        <el-row type="flex" align="middle">
          <el-col :span="12" :offset="1">
            <el-menu style="border:none;" :default-active="activeIndex"
                     mode="horizontal" active-text-color="#d83993"
                     @select="handleSelect">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">排行</el-menu-item>
              <el-menu-item index="3">歌单</el-menu-item>
              <el-menu-item index="4">歌手</el-menu-item>
              <el-menu-item index="5">MV</el-menu-item>
            </el-menu>
          </el-col>

          <el-col :span="10" :offset="1">
            <div class="flex-center">
              <el-input placeholder="请输入歌名、歌词、歌手或专辑"
                        prefix-icon="el-icon-search" v-model="searchText">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </template>
    </nav-bar>
  </el-header>
</template>

<script>
import NavBar from '../../../../components/content/navBar/NavBar.vue'
export default {
  components: { NavBar },
  data () {
    return {
      activeIndex: '1',
      currentIndex: '1',
      searchText: ''
    }
  },
  methods: {
    handleSelect (index, keyPath) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: var(--nav-bar-height) !important;
  width: 100%;
  padding: 0 calc((100% - 1200px) / 2);
  box-shadow: 0 2px 10px 0 rgba(52, 52, 52, 10%);
  background-color: #fff;
}

.el-row {
  height: inherit;
}

.el-menu {
  height: inherit;
  width: 100%;

  &-item {
    font-size: var(--font-size-medium);
  }
}

.el-image {
  width: 50px;
  height: 50px;
  padding-right: 0.5rem;
}

.logo {
  display: flex;
  align-items: center;

  &-title {
    font-size: 24px;
  }
}

.el-input {
  width: 300px;
}
</style>