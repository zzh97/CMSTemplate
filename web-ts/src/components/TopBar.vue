<template>
  <header>
    <!-- 标头 -->
    <div style="display: flex; align-items: center;">
      <div class="logo" style="width: 5rem; height: 5rem;"></div>
      <div class="title" style="color: #fff; font-size: 2rem;">
        <span style="font-size: 2rem;">Z</span>
        <span style="font-size: 1.5rem;">ero</span>
        <span style="font-size: 1.6rem;">大学牲口管理系统</span>
        <span style="font-size: 1.2rem;"> V1.0</span>
      </div>
    </div>
    <!-- 操作区 -->
    <div class="operate" style="margin-right: 2rem;">
      <div
        class="user"
        style="overflow: hidden; display: flex; justify-content: center; width: 4.4rem; height: 4.4rem; border: solid 2px #fff; border-radius: 2.2rem;"
        @click="show_info"
      >
        <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-top: 0.8rem;">
          <div
            style="width: 2rem; height: 2rem; border: solid 1px #fff; border-radius: 1rem; background: #fff;"
          ></div>
          <div
            style="width: 3rem; height: 3rem; border: solid 1px #fff; border-radius: 1.5rem; background: #fff;"
          ></div>
        </div>
      </div>
    </div>
    <!-- 退出登录 -->
    <MsgBox title="退出登录" v-model:isShow="isShow" @confirm="logout">
      是否退出登录
    </MsgBox>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

const isShow = ref(false)
const show_info = () => {
  isShow.value = true
}
const logout = () => {
  zh.msg_box('退出登录')
  router.push('/Login')
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 6rem;
  background:#5A8;
}
</style>
