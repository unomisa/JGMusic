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
  TabPane
} from 'element-ui'

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
  TabPane
]

elementCom.forEach(component => {
  Vue.use(component)
})