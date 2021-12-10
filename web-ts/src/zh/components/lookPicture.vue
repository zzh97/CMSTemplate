<!--
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-07-13 13:51:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-09-10 14:21:30
-->
<template>
  <div class="lookPicture">
    <!-- 遮罩 -->
    <div class="shadow" 
    ></div>
    <!-- 图片 -->
    <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" class="picture">
      <img id="img" :style="'width:'+width+'px'" :src="imgUrl" alt="">
    </div>
    <!-- 按钮 -->
    <div class="ico close" @click="close">X</div>
    <div class="ico back" @click="back">1</div>
    <div class="ico next" @click="next">></div>
    <!-- 索引 -->
    <div class="indexBox">
      <div class="index">
        <div class="point" :style="i == now ? 'background: #fff' : ''" v-for="(o, i) in imageList" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const imageList:[] = []
const imgUrl:string = ''
const imgStyle:string = ''
const width:number = 5000
const height:number = 0
const now:number = 0
const loading:boolean = true
const __main__ = () => {

}

__main__ ()
// // import zhPortChange from './portChange'
// export default {
//   name: 'lookPicture',
//   components: {
//     // zhPortChange
//   },
//   props: {
//     id: {
//       type: [String, Number],
//       default: 0
//     },
//     // 0-机房，1-OLT，2-光交，3-12U，4-小区
//     type: {
//       type: [String, Number],
//       default: 4
//     },
//   },
//   data() {
//     return {
//       imageList: [],
//       imgUrl: '',
//       imgStyle: '',
//       width: 500,
//       height: 0,
//       now: 0,
//       loading: true,
//     };
//   },
//   mounted () {
//     this.__main__ ()
//   },
//   methods: {
//     __main__ () {
//       this.loading = true
//       // 获取实景图片
//       this.$zh.getPicture({
//         id: this.id, 
//         type: this.type
//       }, imageList =>{
//         this.imageList = imageList
//         console.log (this.imageList)
//         this.imgUrl = this.imageList[0].url
//         this.set_image_size(this.imgUrl)
//         this.loading = false
//         // 滚动改变大小
//         this.$zh.mouseScroll(eType=>{
//           if (eType == 'up') {
//             // console.log("滑轮向上滚动");
//             this.width += 10
//           } else if (eType == 'down') {
//             // console.log("滑轮向下滚动");
//             this.width -= 10
//           }
//         })
//         // // 按Esc键关闭
//         // window.addEventListener('keypress', (e)=>{
//         //   console.log (e)
//         // })
//       })
//     },
//     set_image_size (imgUrl) {
//       // 获取原始大小
//       let nImg = new Image()
//       nImg.onload = () => {
//         let oldWidth= nImg.width
//         let maxWidth = document.body.offsetWidth
//         // 限制最大尺寸
//         if (oldWidth > maxWidth) {
//           this.width = maxWidth
//         } else {
//           this.width = oldWidth
//         }
//         console.log ('w', this.width)
//       }
//       nImg.src = imgUrl
//     },
//     close () {
//       this.$emit('closePicture')
//     },
//     clickShadow () {
//       // console.log (1111)
//     },
//     back () {
//       if (this.now > 0) {
//         this.now--
//         this.imgUrl = this.imageList[this.now].url
//         // 重置大小
//         this.set_image_size(this.imgUrl)
//       }
//     },
//     next () {
//       if (this.now < this.imageList.length - 1) {
//         this.now++
//         this.imgUrl = this.imageList[this.now].url
//         // 重置大小
//         this.set_image_size(this.imgUrl)
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.lookPicture {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.lookPicture .shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background: rgba($color: #000000, $alpha: 0.5);
}
.lookPicture .ico {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: #eee;
  background: #555;
  border-radius: 20px;
  cursor: pointer;
  z-index: 1000;
  user-select: none;
}
.lookPicture .close {
  position: fixed;
  top: 40px;
  right: 40px;
}
.lookPicture .back {
  position: fixed;
  top: 50%;
  left: 40px;
  margin-top: -20px;
}
.lookPicture .next {
  position: fixed;
  top: 50%;
  right: 40px;
  margin-top: -20px;
}
.lookPicture .picture {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.lookPicture .indexBox {
  position: fixed;
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 40px;
  z-index: 1000;
}
.lookPicture .index {
  float: left;
}
.lookPicture .index .point {
  float: left;
  margin-right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: #aaa;
}
</style>