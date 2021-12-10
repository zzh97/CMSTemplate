<template>
    <div
        style="position: fixed; width: 5rem; height: 5rem; background: pink;"
        :style="'left:' + X + 'px;' + 'top:' + Y + 'px'"
        @mousedown="down"
    ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const zh = window.zh


const X = ref(20)
const Y = ref(20)
let startX = 0
let startY = 0
zh.move_element((relationX: number, relationY: number) => {
    X.value = startX + relationX
    Y.value = startY + relationY
    console.log(X.value, Y.value)
})

const down = () => {
    zh.isDown = true
    startX = X.value
    startY = Y.value
}
</script>