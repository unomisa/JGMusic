<template>
  <div @click="artistDetail">
    <el-image class="pic" :src="singer.picUrl + '?param=200y200'" fit="fill">
    </el-image>
    <div class="name">
      <span>{{singer.name}}</span>
      <div class="account" @click.stop="userDetail" v-if="singer.accountId">
        <i class="el-icon-user account-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singer: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    artistDetail () {
      this.$router.push('/artistDetail/' + this.singer.id)
    },

    userDetail () {
      this.$router.push('/userDetail/' + this.singer.accountId)
    }
  }
}
</script>

<style lang="less" scoped>
.pic {
  cursor: pointer;
  border-radius: 5px;
  height: 200px; // 设置图片固定大小可以放置页面抖动
  width: 200px;
}

.name {
  position: relative;
  // text-align: center;
  margin-top: 5px;
}

.account {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: var(--color-main);
  border-radius: 100%;
  cursor: pointer;

  &-icon {
    font-size: 12px;
    color: white;
  }

  &:hover {
    background-color: red;
  }
}
</style>