<template>
  <preview @click.native="userDetail">
    <template v-slot:left>
      <el-image class="cover" :src="user.avatarUrl + '?param=100y100'"
                fit="fill" />
      <span v-if="user.authStatus === 1">
        <el-avatar class="author-icon" shape="circle"
                   :src="user.avatarDetail.identityIconUrl + '?param=20y20'"
                   fit="fill" />
      </span>
    </template>
    <template v-slot:right>
      <el-row class="row" :gutter="20">
        <el-col :span="12" :offset="0">
          <span class="name">{{user.name}}</span>

          <span class="gender">
            <svg class="icon" aria-hidden="true" v-if="user.gender === 1">
              <use xlink:href="#icon-nan"></use>
            </svg>

            <svg class="icon" aria-hidden="true" v-if="user.gender === 2 ">
              <use xlink:href="#icon-nv"></use>
            </svg>
          </span>
        </el-col>
        <el-col :span="12" :offset="0">
          <div class="signature">
            {{user.signature}}
          </div>
        </el-col>
      </el-row>
    </template>
  </preview>
</template>

<script>
import Preview from 'components/content/preview/Preview'

export default {
  components: { Preview },
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    userDetail () {
      this.$router.push('/user/detail/' + this.user.id)
    }
  }
}
</script>

<style lang="less" scoped>
@height: 100px;
.cover {
  position: relative;
  z-index: 1;
  height: @height;
  width: @height;
  border-radius: 100%;
  border: 1px solid var(--color-border);
  border-right: none;
}

.row {
  width: 100%;
}

.author-icon {
  position: absolute;
  z-index: 3;
  right: 3px;
  bottom: 3px;
  height: 20px;
  width: 20px;
}

.name {
  margin-right: 10px;
}

.signature {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  font-size: 14px;
  color: var(--color-light-gray);
}
</style>