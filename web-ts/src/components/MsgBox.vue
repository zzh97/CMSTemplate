<template>
  <transition name="fade">
    <div class="msgBox" v-if="isShow">
      <div class="box">
        <div class="cap">
          {{ title }}
          <div class="back" @click="back">
            <div class="line line1"></div>
            <div class="line line2"></div>
          </div>
        </div>
        <div class="msg">
          <slot></slot>
        </div>
        <div class="btn">
          <button class="confirm" @click="back(); $emit('confirm')">{{ confirm }}</button>
          <button class="cancel" @click="back(); $emit('cancel')">{{ cancel }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup="props, context" lang="ts">

import { ref, reactive, onMounted } from 'vue'
// const props = defineProps({
//   fShow: Boolean
// })
// const emit = defineEmits([
//   "update:fShow",
//   "confirm",
//   "cancel"
// ])
// 这是ts的写法，只有就能类型注释了
const props = defineProps<{
  isShow: boolean
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:isShow', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

// const title = ref('消息框的标题')
const confirm = ref('确定')
const cancel = ref('取消')

// 用实例来使用emit
// import { ComponentInternalInstance, getCurrentInstance } from "vue"
// const instance = getCurrentInstance()  as ComponentInternalInstance
const back = () => {
  // 不用实例，则需要先在defineEmits中声明
  emit('update:isShow', false)
  // instance.emit('update:fShow', false)
}
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.msgBox {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  user-select: text;
}
.msgBox .box {
  width: 30rem;
}
.box .cap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background: #5b5;
  color: #fff;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.box .msg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: calc(100% - 2rem);
  min-height: 10rem;
  background: #fff;
}

.box .btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 1rem;
  width: 100%;
  background: #fff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.btn .confirm {
  background: #5b5;
}
.btn .cancel {
  background: #d55;
}

.cap .back {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
}
.back .line {
  position: absolute;
  top: 0.9rem;
  right: 0.3rem;
  width: 1.4rem;
  height: 0.2rem;
  background: #555;
}
.back .line1 {
  transform: rotate(45deg);
}
.back .line2 {
  transform: rotate(-45deg);
}
.cap .back:hover > div {
  background: #333;
}
</style>
