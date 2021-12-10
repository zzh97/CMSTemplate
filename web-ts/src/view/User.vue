<template>
  <div class="user">
    <div class="option">
      <div class="left">
        <span>关键词：</span>
        <input
          style="border:solid 1px #ddd;"
          v-model="keyword"
          type="text"
          placeholder="请输入账号/联系方式"
        />
      </div>
      <div class="right">
        <button @click="get_user">查询</button>
        <button style="margin-left: 1rem; background: #d55;" @click="reset_user">重置</button>
      </div>
    </div>
    <div class="content">
      <!-- 表头 -->
      <div class="caption">用户列表</div>
      <table>
        <!-- 属性 -->
        <tr>
          <td v-for="o in culArr">{{ o }}</td>
          <td>操作</td>
        </tr>
        <!-- 记录 -->
        <tr v-for="(o, i) in tableArr">
          <td>{{ i + 1 }}</td>
          <td>{{ o.username ? o.username : '-' }}</td>
          <td>{{ o.password ? o.password : '-' }}</td>
          <td>{{ o.phone ? o.phone : '-' }}</td>
          <td>{{ o.createTime ? o.createTime : '-' }}</td>
          <td>{{ o.power ? setMap(o.power) : '-' }}</td>
          <td style="user-select: none;">
            <span @click="init_user(o.username)" style="color: #35d; cursor: pointer;">重置密码</span>
            <span
              @click="del_user(o.username)"
              style="margin-left: 1rem; color: #d35; cursor: pointer;"
            >删除</span>
          </td>
        </tr>
      </table>
      <div
        v-if="tableArr.length == 0"
        style="padding: 1rem 0; width: calc(100% - 2px); text-align: center; font-size: 1.4rem; border-bottom: solid 1px #ccc; border-left: solid 1px #ccc; border-right: solid 1px #ccc; color: #777;"
      >暂无数据</div>
      <div
        style="margin-top: 1rem; display: flex; justify-content: end; width: 100%; height: 3rem;"
      >
        <div
          style="height: 3rem; line-height: 3rem; text-align: center; color: #777;"
        >共{{ totalNum }}条</div>
        <div
          v-for="i in Math.ceil(totalNum / 10)"
          class="pageIndex"
          :class="pageIndex == i ? 'pageIndex-active' : ''"
          @click="tab_page(i)"
        >{{ i }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import userCurrentInstance from '../zh/useCurrentInstance'
const { proxy } = userCurrentInstance()
const zh = proxy.$zh

const culArr = ref([
  '序号',
  '账号',
  '密码',
  '联系方式',
  '创建时间',
  '功能权限',
])

const tableArr = ref([
  {
    id: '10010',
    username: 'admin',
    password: 'zxc123',
    phone: '15591950177',
    createTime: '2021-11-11',
    power: 1,
  }
])

const setMap = (key: number) => {
  let value = ''
  switch (key) {
    case 1:
      value = '全部'
      break
    case 2:
      value = '学籍'
      break
    case 3:
      value = '课程'
      break
  }
  return value
}

const totalNum = ref(0)

const keyword = ref('')
const pageIndex = ref(1)

const del_user = (username: string) => {
  zh.ajax({
    url: '/user/delSomeUser',
    method: 'GET',
    data: { username }
  }).then((res: any) => {
    console.log(res)
    get_user()
  })
}

const init_user = (username: string) => {
  zh.ajax({
    url: '/user/initSomeUser',
    method: 'GET',
    data: { username }
  }).then((res: any) => {
    console.log(res)
    get_user()
  })
}

const get_user = () => {
  console.log('get_user')
  zh.ajax({
    url: '/user/getUserList',
    method: 'GET',
    data: { keyword: keyword.value, pageIndex: pageIndex.value }
  }).then((res: any) => {
    console.log(res)
    tableArr.value = res.userList
    totalNum.value = res.totalNum
  })
}

const reset_user = () => {
  keyword.value = ''
  get_user()
}

const tab_page = (index: number) => {
  pageIndex.value = index
  get_user()
}

const __main__ = () => {
  get_user()
}

__main__()

</script>

<style scoped>
.option {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  min-height: 5rem;
  border-bottom: solid 1rem #eee;
}

.left {
  margin-left: 1rem;
}
.right {
  margin-right: 1rem;
}
.content {
  overflow: auto;
  margin: 1rem;
}
.caption {
  line-height: 5rem;
  font-size: 2rem;
  font-weight: bold;
  text-indent: 1rem;
}

.pageIndex {
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #eee;
  border-radius: 0.4rem;
  cursor: pointer;
}
.pageIndex:hover {
  background: #cda;
}
.pageIndex-active {
  background: #cda;
}

table {
  width: 100%;
  /* 清楚td之间的间隔 */
  border-spacing: 0;
  /* td相邻border合并 */
  border-collapse: collapse;
}

/* table下第二个元素 */
tr:nth-child(1) {
  background: #eee;
  font-weight: bold;
}

tr {
  text-align: center;
  font-size: 1.4rem;
}

tr td {
  min-width: 10rem;
  padding: 0.5rem;
  border: solid 1px #ccc;
}
</style>