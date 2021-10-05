<template>
  <div class="preview">
    <div class="preview-left">
      <slot name="left"></slot>
    </div>
    <div class="preview-right">
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {

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
    background-color: #fbebf4 !important;
  }

  &-left {
    height: @height;
    position: relative;
    width: 0;
    flex: @height 0;
    margin-right: 2rem;
  }

  &-right {
    width: 0;
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>