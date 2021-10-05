<template>
  <div class="preview" @click="artistDetail">
    <div class="preview-left">
      <el-image class="cover" :src="artist.picUrl + '?param=100y100'"
                fit="fill" />
    </div>
    <div class="preview-right">
      <div>
        <span>{{artist.name}}</span>&nbsp;
        <span class="alias" v-if="artist.trans">({{artist.trans}})</span>
        <span class="alias"
              v-if="artist.alias && !artist.trans">({{artist.alias}})</span>
      </div>

      <div class="account" @click.stop="userDetail" v-if="artist.accountId">
        <i class="el-icon-user account-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    artistDetail () {
      this.$router.push('/artistDetail/' + this.artist.id)
    },

    userDetail () {
      this.$router.push('/user/detail/' + this.artist.accountId)
    }
  }
}
</script>

<style lang="less" scoped>
@height: 100px;

.preview {
  position: relative;
  display: flex;
  height: @height;
  cursor: pointer;
  padding: 10px 30px;
  border-radius: 3px;

  &:nth-child(2n + 1) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #fbebf4;
  }

  &-left {
    flex: @height 0;
    margin-right: 1rem;
  }

  &-right {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.cover {
  height: @height;
  width: @height;
  border-radius: 5px;
  border: 1px solid var(--color-border);
}

.alias {
  color: var(--color-light-gray);
}

.account {
  content: "";
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
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