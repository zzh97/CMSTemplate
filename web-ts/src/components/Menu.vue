<template>
  <aside>
    <div class="menu">
      <div v-for="o in zh.menu">
        <router-link :to="o.url" @click="add_tag(o)">{{ o.tag }}</router-link>
      </div>
    </div>
    <div class="btn" @click="tabMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </aside>
</template>

<script setup lang="ts">

import { ref, reactive } from 'vue'
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

zh.tags.push(zh.menu[0])

let isTab = false
const menuWidth = ref('17.5rem')

const tabMenu = () => {
  if (isTab) {
    menuWidth.value = '17.5rem'
  }else {
    menuWidth.value = '0'
  }
  isTab = !isTab
}

const add_tag = (tag: { url: string, tag: string, isActive: boolean }) => {
  // 只添加一次tag的信号量
  let isAdd = true
  // 判断tags中是否有该tag
  for (let o of zh.tags) {
    // 初始化选中标记
    o.isActive = false
    if (o.url == tag.url) {
      isAdd = false
      // break;
    }
  }
  // 添加选中标记
  tag.isActive = true;
  // 没有则添加
  if (isAdd) {
    zh.tags.push(tag)
  }
}

const __main__ = () => {
  let viewWidth = window.screen.width
  if (viewWidth < 500) {
    isTab = false
    tabMenu()
  } else {
    isTab = true
    tabMenu()
  }
}

__main__()
</script>

<style scoped>
aside {
  display: flex;
  width: auto;
  height: calc(100vh - 6rem);
}
aside .menu {
  overflow: hidden;
  width: v-bind("menuWidth");
  height: 100%;
  background: #fff;
  transition: width 0.5s;
}
aside a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17.5rem;
  height: 5rem;
  color: #687;
  font-size: 1.8rem;
  /* font-weight: bold; */
}

aside a:hover {
  color: #354;
  background: #efd;
}
aside .btn {
  margin-top: 1rem;
  margin-left: 0.5rem;
}
aside .btn .line {
  margin-bottom: 0.2rem;
  width: 2rem;
  height: 0.4rem;
  background: #99a;
}
aside .btn:hover .line {
  background: #789;
}
</style>
