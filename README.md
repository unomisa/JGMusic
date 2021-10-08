# JGMusic
网易云第三方播放网站
线上demo：http://121.41.74.40/

## Project setup

#### 下载依赖
```
npm install
```
#### 编译element-ui自定义主题文件（需此文件才能运行）
```
npm i

node_modules/.bin/et -c ./src/element-ui/element-variables.scss -o ./src/assets/theme
```

#### APi详情：[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
#### 获取网易云Api
```
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git 

cd NeteaseCloudMusicApi

npm install
```
#### 运行api后台
```
node app.js
```




### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
