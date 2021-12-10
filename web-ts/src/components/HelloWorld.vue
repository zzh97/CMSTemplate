<script setup lang="ts">
import { ref } from 'vue'

// 组件通信的设置
defineProps({
  fatherMsg: String
})
defineEmits([
  'getChildMsg'
])

const msg = '子组件的值'

// 暴露出去的属性（用于ref获取）
defineExpose({
  msg
});

</script>

<template>
  <h1 @click="$emit('getChildMsg', msg)">{{ fatherMsg }}</h1>
</template>

<style scoped>

</style>
