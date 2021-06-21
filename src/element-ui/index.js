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
  Tooltip
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
  Tooltip
]

elementCom.forEach(component => {
  Vue.use(component)
})