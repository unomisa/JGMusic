import CommentDialog from './CommentDialog.vue'
const cDialog = {}

cDialog.install = function (Vue) {
  const CommentDialogContrustor = Vue.extend(CommentDialog) // 创建一个构造器
  const cDialog = new CommentDialogContrustor() // 使用构造器创建一个Vue实例
  cDialog.$mount(document.createElement('div')) // 将该实例挂载到一个div上
  document.body.appendChild(cDialog.$el) // 将这个div添加至文档流
  Vue.prototype.$comment = cDialog // 在全局Vue实例上添加一个toast对象
}

export default cDialog