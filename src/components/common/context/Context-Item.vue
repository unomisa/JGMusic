<template>
  <li class="context-item">
    <div class="item-icon">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </li>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.context {
  &-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;

    &:hover {
      background-color: #fbebf4;
    }
  }
}

.item-icon {
  margin-right: 1rem;
  font-size: 18px;
}
</style>