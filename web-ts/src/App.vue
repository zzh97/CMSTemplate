<template>
  <router-view />
  <router-view name="Header" />
  <div style="display: flex; width: calc(100vw - 0.5rem);">
    <router-view name="Menu" />
    <section>
      <router-view name="Nav" />
      <main>
        <router-view name="Main"></router-view>
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
// 直接使用会警告：类型“ComponentInternalInstance | null”上不存在属性“proxy”
// const { proxy } = getCurrentInstance()
// 故封装一层
import userCurrentInstance from './zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh
// 请求拦截器
zh.ajaxSystem.intercept_request = (xhr: XMLHttpRequest)=>{
  // xhr.setRequestHeader('Authorization', 'admin123')
}
// 响应拦截器
zh.ajaxSystem.intercept_response = (res:{code:number, data:JSON, info:string}, resolve:Function, reject:Function)=>{
  console.log (res)
  if (res.code == 200) {
    resolve(res.data)
  } else {
    zh.msg_box(res.info)
    reject(res.info)
  }
}

// 设置1rem = 多少px
const set_rem = function (scale: number = 135) {
  // 屏幕宽度
  let vw = document.body.clientWidth
  // console.log (document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth)
  // 计算1rem = 多少px
  let rem = vw / scale
  console.log(`屏幕宽度：${vw}px`)
  console.log(`1rem = ${rem}px`)
  // 设置rem
  let html = document.getElementsByTagName('html')[0]
  rem = 10
  html.style.fontSize = rem + 'px'
}

set_rem()

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
}
body {
  font-size: 16px;
  background: #eee;
}

a {
  /* 不要下划线 */
  text-decoration: none;
  color: #687;
}
/* 颜色一致 */
a:hover,
a:visited,
a:link,
a:active {
  color: #687;
}

input {
  background: #fff;
  outline: none;
  border: none;
  width: 15rem;
  line-height: 2.5rem;
  font-size: 1.4rem;
  text-indent: 0.5rem;
  border-radius: 0.4rem;
  color: #345;
}

button {
  /*消除button的默认样式*/
  /*这种写法是对所有的button标签同时生效*/
  margin: 0px;
  padding: 0.5rem 1.5rem;
  /*自定义边框*/
  border: 0px;
  /*消除默认点击蓝色边框效果*/
  outline: none;
  background: #494;
  font-size: 1.4rem;
  border-radius: 0.4rem;
  color: #fff;
  user-select: none;
}

button:hover {
  background: #4a5;
}

select {
  padding-right: 1.8rem;
  width: 10rem;
  color: #345;
  font-size: 1.6rem;
  border: solid 1px #687;
  outline: none;
  font-size: 1.4rem;
  /*去掉默认的下拉三角*/
  /* appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none; */
  /*添加下拉三角图标*/
  /* background: url("../img/task5-2_07.jpg") no-repeat right center transparent; */
}

#app {
  display: flex;
  flex-wrap: wrap;
  /* width: 100vw;
  height: 100vh;
  overflow: auto; */
}

section {
  width: calc(100vw - 2rem);
  overflow: auto;
  /* width: 100%; */
}

main {
  margin: 0 1rem;
  width: auto;
  height: calc(100vh - 13rem);
  background: #fff;
}
</style>