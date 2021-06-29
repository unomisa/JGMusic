<template>
  <el-col :span="6">
    <el-row>
      <el-col :span="12" :offset="6" class="col-voice">
        <play-bar-volume />
      </el-col>
      <el-col :span="4" :offset="2" class="col-list">
        <play-bar-list />
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import PlayBarList from './childComp/PlayBarList..vue'
import PlayBarVolume from './childComp/PlayBarVolume.vue'

export default {
  components: {
    PlayBarList,
    PlayBarVolume
  }

}
</script>

<style lang="less" scoped>
.el-col,
.el-row {
  height: 100%;
}

.col {
  &-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 3px;
  }

  &-voice {
    display: flex;
    align-items: center;
  }
}
</style>