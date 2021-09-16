<template>
  <div class="tags-box">
    <div class="area tags">
      <div class="title">语种：</div>
      <div style="flex:1">
        <span v-for="(areaObj,index) in areaObjs" :key="areaObj.name">
          <span class="tag" :class="{'tag-active': areaObj.tag === area}"
                @click="areaTag(areaObj.tag)">
            {{areaObj.name}}
          </span>
          <el-divider direction="vertical" v-if="index !== areaObjs.length-1">
          </el-divider>
        </span>
      </div>
    </div>
    <div class="type tags">
      <div class="title">分类：</div>
      <div style="flex:1">
        <span v-for="(typeObj,index) in typeObjs" :key="typeObj.name">
          <span class="tag" :class="{'tag-active': typeObj.tag === type}"
                @click="typeTag(typeObj.tag)">
            {{typeObj.name}}
          </span>
          <el-divider direction="vertical" v-if="index !== typeObjs.length-1">
          </el-divider>
        </span>
      </div>
    </div>
    <div class="initial tags">
      <div class="title">筛选：</div>
      <div style="flex:1">
        <span v-for="(initialObj,index) in initialObjs" :key="initialObj.name">
          <span class="tag" :class="{'tag-active': initialObj.tag === initial}"
                @click="initialTag(initialObj.tag)">
            {{initialObj.name}}
          </span>
          <el-divider direction="vertical"
                      v-if="index !== initialObjs.length-1">
          </el-divider>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      default: '-1'
    },
    type: {
      type: String,
      default: '-1'
    },
    initial: {
      type: String,
      default: '-1'
    }
  },
  data () {
    return {
      areaObjs: [
        { name: '全部', tag: '-1' },
        { name: '华语', tag: '7' },
        { name: '欧美', tag: '96' },
        { name: '日本', tag: '8' },
        { name: '韩国', tag: '16' },
        { name: '其他', tag: '0' }
      ],
      typeObjs: [
        { name: '全部', tag: '-1' },
        { name: '男歌手', tag: '1' },
        { name: '女歌手', tag: '2' },
        { name: '乐队组合', tag: '3' }
      ],
      initialObjs: [
        { name: '热门', tag: '-1' },
        { name: 'A', tag: 'a' },
        { name: 'B', tag: 'b' },
        { name: 'C', tag: 'c' },
        { name: 'D', tag: 'd' },
        { name: 'E', tag: 'e' },
        { name: 'F', tag: 'f' },
        { name: 'G', tag: 'g' },
        { name: 'H', tag: 'h' },
        { name: 'I', tag: 'i' },
        { name: 'J', tag: 'j' },
        { name: 'K', tag: 'k' },
        { name: 'L', tag: 'l' },
        { name: 'M', tag: 'm' },
        { name: 'N', tag: 'n' },
        { name: 'O', tag: 'o' },
        { name: 'P', tag: 'p' },
        { name: 'Q', tag: 'q' },
        { name: 'R', tag: 'r' },
        { name: 'S', tag: 's' },
        { name: 'T', tag: 't' },
        { name: 'U', tag: 'u' },
        { name: 'V', tag: 'v' },
        { name: 'W', tag: 'w' },
        { name: 'X', tag: 'x' },
        { name: 'Y', tag: 'y' },
        { name: 'Z', tag: 'z' },
        { name: '#', tag: '0' }
      ]
    }
  },
  methods: {
    areaTag (tag) {
      this.$emit('update:area', tag)
    },
    typeTag (tag) {
      this.$emit('update:type', tag)
    },
    initialTag (tag) {
      this.$emit('update:initial', tag)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  flex: 60px 0;
  font-size: 18px;
}

.tags {
  display: flex;
  // margin: 1rem 0;

  &-box {
    margin: 2rem 0;
  }
}

.tag {
  display: inline-block;
  padding: 3px 15px;
  border-radius: 15px;
  color: var(--color-gray);
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    color: black;
  }

  &-active {
    background-color: #fcf4f9;
    color: var(--color-main) !important;
  }
}
</style>