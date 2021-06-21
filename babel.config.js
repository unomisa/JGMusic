module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        // styleLibraryName: 'theme-chalk' // 默认样式
        styleLibraryName: '~src/assets/theme' // 自定义样式
      }
    ]
  ]
}
