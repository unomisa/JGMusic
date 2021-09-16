<template>
  <detail-card class="card" :loading="loading">
    <template v-slot:all>
      <div class="card-backdrop" :style="backdropStyle" />
    </template>

    <template v-slot:left>
      <el-image class="cover" :src="list.coverImgUrl + '?param=200y200'"
                fit="fill">
      </el-image>
    </template>
    <template v-slot:right>
      <div class="list-right">
        <div class="hight">
          <span class="hight-btn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-_huangguan"></use>
            </svg>
            精品歌单
          </span>
        </div>

        <div class="list-name">{{list.name}}</div>
        <div class="list-copywriter">{{list.copywriter}}</div>
      </div>
    </template>
  </detail-card>
</template>

<script>
import DetailCard from 'components/content/detailCard/DetailCard.vue'
export default {
  components: { DetailCard },
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    backdropStyle () {
      return {
        background: `url(${this.list.coverImgUrl}?param=200y200)`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0;

  &-backdrop {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    filter: blur(30px) brightness(0.6);
    border-radius: 4px;
  }
}

.cover {
  height: 190px;
  width: 190px;
  border-radius: 5px;
}

.list {
  &-right {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    color: white;
  }

  &-name {
    margin-bottom: 1rem;
  }

  &-copywriter {
    font-size: 14px;
    color: #cecfd3;
  }
}

.hight {
  margin-bottom: 30px;

  &-btn {
    display: inline-block;
    padding: 10px 20px;
    border: #f3b068 1px solid;
    color: #f3b068;
    border-radius: 20px;
  }
}
</style>