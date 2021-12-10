<template>
  <div class="login">
    <div class="box">
      <div
        class="title"
        style="margin-top: 1rem; text-align: center; font-size: 2rem; font-weight: bold; line-height: 5rem;"
      >李群の奇妙冒险</div>
      <div class="info" style="display: flex; flex-wrap: wrap; justify-content: center;">
        <div class="username" style="margin-top: 1rem;">
          <span>账号：</span>
          <input type="text" v-model="username" />
        </div>
        <div class="password" style="margin-top: 1rem;">
          <span>密码：</span>
          <input type="password" v-model="password" />
        </div>
        <div class="verifier" style="margin-top: 1.5rem; display: flex;">
          <span>验证：</span>
          <div
            style="position: relative; width: 15rem; height: 2rem; background: #fff; border-radius: 0.4rem;"
          >
            <div
              style="position: absolute; top: 0; left: 4.5rem; font-size: 1.4rem; color: #333;"
            >向右滑动</div>
            <div
              style="position: absolute; width: 3rem; height: 2rem; background: #484; border-radius: 0.3rem; cursor: move;"
              :style="'left:' + X + 'px'"
              @mousedown="down"
            ></div>
            <div
              style=" height: 2rem; background: #8a7; border-top-left-radius: 0.3rem; border-bottom-left-radius: 0.3rem;"
              :style="'width:' + (X + 10) + 'px'"
            ></div>
          </div>
        </div>
        <div
          class="btn"
          style="margin-top: 2rem; display: flex; justify-content: space-around; width: 100%;"
        >
          <button @click="showBox">注册</button>
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
    <!-- 弹框，可以写成msg-box，字就不会成红色，也可以写成msgBox但依旧红色 -->
    <!-- v-model:xxx替代了v-bind:xxx + @update:xxx -->
    <MsgBox title="消息框的标题" v-model:isShow="isShow" @confirm="sign_up" @cancel="init">
      <div style="padding: 1rem; background: #eee; border-radius: 1rem;">
        <div style="display: flex; justify-content: space-between;">
          <div style="font-size: 1.5rem;">账号：</div>
          <input type="text" v-model="newUsername" placeholder="请输入账号" />
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
          <div style="font-size: 1.5rem;">密码：</div>
          <input type="password" v-model="newPassword" placeholder="请输入密码" />
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
          <div style="font-size: 1.5rem;">联系方式：</div>
          <input type="password" v-model="newPhone" placeholder="请输入手机号" />
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
          <div style="font-size: 1.5rem;">功能权限：</div>
          <select v-model="newPower">
            <option :value="1">全部</option>
            <option :value="2">学籍</option>
            <option :value="3">课程</option>
          </select>
        </div>
      </div>
    </MsgBox>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
// setup 里面没有访问 this，作为替代，我们使用 useRouter 函数
import { useRouter } from 'vue-router'
const router = useRouter()
// 直接使用会警告：类型“ComponentInternalInstance | null”上不存在属性“proxy”
// const { proxy } = getCurrentInstance()
// 故封装一层
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

const isShow = ref(false)

onMounted(() => {
  // zh.msg_box('你好啊')
})

const newUsername = ref('')
const newPassword = ref('')
const newPhone = ref('')
const newPower = ref(1)

const showBox = () => {
  isShow.value = true
}

const sign_up = () => {
  zh.ajax({
    url: '/user/signUp',
    method: 'POST',
    data: {
      username: newUsername.value,
      password: newPassword.value,
      phone: newPhone.value,
      power: newPower.value
    },
  }).then((res: any) => {
    console.log(res)
    zh.msg_box(res.msg)
    if (res.isSuccess) {
      isShow.value = false
      init()
    }
  })
}

const init = () => {
  newUsername.value = ''
  newPassword.value = ''
  newPhone.value = ''
  newPower.value = 1
}

// 账号密码
const username = ref('')
const password = ref('')

const enter = (e: { key: string }) => {
  console.log(e.key)
  // key和code不一样，code是唯一的（keycode已被弃用）
  if (e.key == 'Enter') {
    if (isShow.value) {
      sign_up()
    } else {
      login()
    }

  }
}

const login = () => {
  // zh.fetch({
  //   url: 'http://127.0.0.1:2333/cors',
  //   method: 'POST',
  //   data: { username: 'asd', password: '123' },
  //   success: (res: any) => {
  //     zh.log(res)
  //   }
  // })
  if (X.value < 120) {
    zh.msg_box('请先通过验证')
    return
  }
  zh.ajax({
    url: '/user/login',
    method: 'POST',
    data: { username: username.value, password: password.value }
  }).then((res: any) => {
    if (res.isSuccess) {
      window.removeEventListener('keydown', enter)
      // removeEventListener掉鼠标事件
      zh.isDel = true
      router.push('/User')
    }
    zh.msg_box(res.msg)
  })
}

const X = ref(10)
let startX = 0
zh.move_element((relationX: number) => {
  let x = startX + relationX
  let min = 0
  let max = 120
  if (x <= min) {
    x = min
  } else if (x >= max) {
    x = max
  }
  X.value = x
})

const down = () => {
  zh.isDown = true
  startX = X.value
}

const __main__ = () => {
  window.addEventListener('keydown', enter)
}

__main__()
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #589;
  user-select: none;
}

.box {
  /* margin-top: -5vh; */
  width: 30rem;
  height: 24rem;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 1rem;
}
</style>