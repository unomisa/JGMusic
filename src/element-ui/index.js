import Vue from 'vue'

import {
  Button,
  Select,
  Carousel,
  carouselItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  Image,
  Input,
  Row,
  Col,
  Divider,
  Card,
  Tooltip,
  Progress,
  Slider,
  Avatar,
  Link,
  Pagination,
  Backtop,
  Icon,
  Dialog,
  Tabs,
  TabPane,
  Notification,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Skeleton,
  SkeletonItem,
  Tag,
  InfiniteScroll
} from 'element-ui'
Vue.prototype.$notify = Notification // 这种方法才能正确注册

Vue.prototype.$notify.topleft = (title, type = 'success') => {
  Vue.prototype.$notify({
    position: 'top-left',
    title,
    offset: 90,
    type,
    duration: 2000
  })
}

Vue.prototype.$notify.wait = () => {
  Vue.prototype.$notify.info({
    position: 'top-left',
    title: '等待开发',
    message: '这是一个等待开发的组件',
    offset: 90
  })
}

const elementCom = [
  Button,
  Select,
  Carousel,
  carouselItem,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  Image,
  Input,
  Row,
  Col,
  Divider,
  Card,
  Tooltip,
  Progress,
  Slider,
  Avatar,
  Link,
  Pagination,
  Backtop,
  Icon,
  Dialog,
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Skeleton,
  SkeletonItem,
  Tag,
  InfiniteScroll
]

elementCom.forEach(component => {
  Vue.use(component)
})