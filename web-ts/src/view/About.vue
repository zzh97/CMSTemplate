<template>
  <div class="about">
    <h1>颜色表</h1>
    <div class="index">
      <div class="label">RED:</div>
      <div class="btn" v-for="(o, i) in oxArr">
        <div @click="change_index(i, 1)">{{ o }}</div>
      </div>
    </div>

    <div class="index">
      <div class="label">GREEN:</div>
      <div class="btn" v-for="(o, i) in oxArr">
        <div @click="change_index(i, 2)">{{ o }}</div>
      </div>
    </div>

    <div class="index">
      <div class="label">BLUE:</div>
      <div class="btn" v-for="(o, i) in oxArr">
        <div @click="change_index(i, 3)">{{ o }}</div>
      </div>
    </div>

    <div class="paper">
      <div class="round" v-for="colors in colorArr[index]">
        <div class="box" v-for=" o in colors">
          <div class="color" :style="'background: ' + o"></div>
          <div class="code">{{ o }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const oxArr = ['F', 'E', 'D', 'C', 'B', 'A', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
const colorArr: any = reactive([])
const index = ref(0)

const change_index = (num: number, i: number) => {
  index.value = num
  createColor(i)
}

const createColor = (index: number) => {
  colorArr.splice(0, colorArr.length)
  let arr = ['f', 'f', 'f']

  const push_color = (indexs: [number, number, number]) => {
    for (let ox1 of oxArr) {
      let colorsPro = []
      for (let ox2 of oxArr) {
        let colors = []
        for (let ox3 of oxArr) {
          arr[indexs[0]] = ox1
          arr[indexs[1]] = ox2
          arr[indexs[2]] = ox3

          let str = '#' + arr.join('')
          colors.push(str)
          // zh.log(str)
        }
        colorsPro.push(colors)
        // break;
      }
      colorArr.push(colorsPro)
      // break;
    }
  }

  switch (index) {
    case 1:
      // fff -> ff0 -> f00 -> 000
      push_color([0, 1, 2])
      break;
    case 2:
      // fff -> fff -> 0f0 -> 000
      push_color([1, 0, 2])
      break;
    case 3:
      // fff -> 0ff -> 00f -> 000
      push_color([2, 1, 0])
      break;
  }

  // zh.log(colorArr)
}

</script>

<style scoped>
.about {
  padding: 1rem;
}
.index {
  display: flex;
  flex-wrap: wrap;
}
.index .label {
  margin: 0.5rem;
  margin-left: 0;
  width: 7rem;
  text-align: right;
}
.index .btn {
  margin: 0.5rem;
  cursor: pointer;
}
.round {
  display: flex;
  flex-wrap: wrap;
}
.box {
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  width: 7.5rem;
  height: 7.5rem;
  background: #fff;
}
.box .color {
  width: 100%;
  height: 5.5rem;
}
.box .code {
  width: 100%;
  height: 2rem;
  color: rgb(68, 67, 67);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>