<template>
    <h3>{{ zh.userName }}</h3>
    <HelloWorld ref="child" fatherMsg="click me" @getChildMsg="logChildMsg" />
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'

import { ref, onMounted } from 'vue'
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

onMounted (() => {
  zh.log ('Dom渲染完成')
})

// 通过自定义事件获取子组件的值
const logChildMsg = function (str:string) {
  zh.log ('自定义事件：',str)
}

// 通过ref获取子组件的值
const child = ref();

// 不加mounted的话，值还没获取到就打印了
onMounted(()=>{
  zh.log('ref获取：', child.value.msg);
})

setTimeout(()=>{
    zh.userName = '李四'
}, 500)

</script>

<style scoped>
</style>