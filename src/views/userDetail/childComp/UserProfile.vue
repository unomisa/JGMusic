<template>
  <div class="container">
    <el-card class="userDetail-card">
      <user-profile-skeleton style="width:100%">
        <div class="card-body">
          <div class="card-left">
            <el-image class="avatar" :src="profile.avatarUrl + '?param=300y300'"
                      fit="contain" :lazy="true">
              <div slot="error" class="avatar-error">
                <i class="el-icon-user user-icon"></i>
              </div>
            </el-image>
          </div>
          <div class="card-right">
            <div class="nickname">{{profile.nickname}}</div>

            <div class="other">
              <span class="level">Lv{{profile.level}}</span>
              <span class="gender">
                <svg class="icon" aria-hidden="true" v-if="profile.gender===1">
                  <use xlink:href="#icon-nan"></use>
                </svg>

                <svg class="icon" aria-hidden="true" v-if="profile.gender!==1">
                  <use xlink:href="#icon-nv"></use>
                </svg>
              </span>
              <div class="edit">
                <el-button type="primary" icon="el-icon-edit" @click="editInfo">
                  编辑个人信息
                </el-button>
              </div>
            </div>

            <el-divider class="divider">
              <i style="font-size:1.5rem" class="el-icon-folder"></i>
            </el-divider>

            <div class="relationship">
              <div class="relationship-text">
                <div class="relationship-number">{{profile.follows}}</div>
                <div>关注</div>
              </div>
              <el-divider class="divider-vertical" direction="vertical">
              </el-divider>
              <div class="relationship-text">
                <div class="relationship-number">{{profile.followeds}}</div>
                <div>粉丝</div>
              </div>
            </div>

            <div>
              个人介绍：
              <span class="signature-content"
                    v-if="profile.signature!==''">{{profile.signature}}</span>
              <span v-if=" profile.signature===''">暂无介绍</span>
            </div>
          </div>
        </div>
      </user-profile-skeleton>
    </el-card>
  </div>
</template>

<script>
import UserProfileSkeleton from '../skeleton/UserProfileSkeleton.vue'
export default {
  components: { UserProfileSkeleton },
  props: {
    profile: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    editInfo () {
      console.log('点击')
      this.$notify.info({
        position: 'top-left',
        title: '等待开发',
        message: '这是一个等待开发的组件',
        offset: 90
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: var(--width-main);
  margin: 0 auto;
}

.userDetail-card {
  margin-top: 50px;
  height: 230px;
}

.card {
  &-body {
    display: flex;
  }

  &-left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    flex: 1;
    // border-right: 3px solid #e8e9ed;
  }

  &-right {
    width: 0;
    flex: 4;
    line-height: 1.5;
  }
}

.avatar {
  height: 170px;
  width: 170px;
  border-radius: 100%;
}

.nickname {
  font-size: 20px;
  font-weight: bold;
}

.other {
  position: relative;
}

.edit {
  position: absolute;
  right: 0;
  bottom: 0;
}

.level {
  border-radius: 20px;
  background-color: #f0f0f0;
  padding: 0 8px;
}

.gender {
  margin-left: 10px;
  font-size: 20px;
}

.divider {
  margin: 16px 0;

  &-vertical {
    height: initial;
    margin: 0 40px;
  }
}

.relationship {
  display: flex;
  margin: 16px 0;

  &-text {
    text-align: center;
    color: #606266;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }

  &-number {
    font-size: 18px;
    font-weight: bold;
  }
}

.signature {
  &-content {
    color: #676767;
  }
}
</style>

<style lang="less">
.userDetail-card .el-card__body {
  box-sizing: border-box;
  height: inherit;
  display: flex;
}

.avatar-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  border-radius: 100%;
  font-size: 50px;
  color: gray;
}
</style>