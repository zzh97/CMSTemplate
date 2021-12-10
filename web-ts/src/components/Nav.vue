<template>
  <nav>
    <div class="router" v-for="(o, i) in zh.tags">
      <div class="tag" :class="o.isActive ? 'active' : ''" @click="clickTag(i)">
        <router-link :to="o.url">{{ o.tag }}</router-link>
        <div class="close" @click.stop="del_tag(o)">
          <div style="width: 1rem; height: 1rem;">
            <div
              style="position: relative; top: 0.4rem; width: 1rem; height: 0.2rem; background: #456; transform:rotate(45deg)"
            ></div>
            <div
              style="position: relative; top: 0.2rem; width: 1rem; height: 0.2rem; background: #456; transform:rotate(-45deg)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

const clickTag = (i: number) => {
  // 清空menu中的标记
  for (let o of zh.tags) {
    o.isActive = false
  }
  // 被点击的menu项加上标记
  zh.tags[i].isActive = true
}

const del_tag = (tag: { url: string, tag: string }) => {
  if (zh.tags.length > 1) {
    let index = 0
    let arr = zh.tags
    // 寻找tag在tags中的位置
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == tag.url) {
        index = i
        break;
      }
    }
    // 删除tag
    zh.tags.splice(index, 1)
    zh.tags[zh.tags.length - 1].isActive = true
    console.log(zh.tags[zh.tags.length - 1])
    // 跳转至前一个tag
    let url = zh.tags[zh.tags.length - 1].url
    router.push(url)
  }
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  margin: 1rem;
  width: 100%;
  height: 5rem;
  background: #fff;
}
nav .tag {
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-right: 0.5rem;
  margin-left: 1rem;
  height: 1.5rem;
  background: rgba(150, 200, 200, 0.3);
  /* border: solid 1px #333; */
  border-radius: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
}
nav .tag .close {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
}
nav .tag .close:hover {
  background: #a87;
  color: #fff;
  border-radius: 1rem;
}
nav .active {
  background: rgba(150, 200, 200, 0.5);
}
nav .active a {
  color: #345;
}
</style>
