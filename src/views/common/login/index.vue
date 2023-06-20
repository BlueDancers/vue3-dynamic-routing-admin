<template>
  <div class="h-[100vh] bg-[#efefef] overflow-hidden flex items-center justify-center flex-col">
    <div class="relative top-[-10%]">
      <p class="font-bold text-[26px] text-center text-black">后台管理系统</p>
      <div class="w-[300px] mt-20">
        <a-input v-model:value="user" placeholder="请输入账号"></a-input>
        <a-input v-model:value="pass" placeholder="密码随意填写" type="password" class="mt-10"></a-input>
        <a-button type="primary" @click="login" class="w-[100%] mt-20" :loading="loginLoading">确定</a-button>
      </div>
      <div class="mt-10">
        <div>账号admin拥有权限: goods goodsAdd</div>
        <div>账号user拥有权限: user userList</div>
        <div>其他账号没有动态权限</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { loginApi } from '@/api/login'

const router = useRouter()
const auth = useAuthStore()

const user = ref('')
const pass = ref('')

const loginLoading = ref(false)

async function login() {
  if (user.value == '' || pass.value == '') {
    message.error({
      content: '请检查账号密码',
    })
    return
  }
  loginLoading.value = true
  console.log('加载登录中')
  try {
    // let res = await loginApi.login(user.value, pass.value)
    auth.isLogin = true
    auth.getAsyncRouer(user.value)
    message.success('登录成功~')
    router.replace({
      name: 'dashboard',
    })
  } finally {
    loginLoading.value = false
  }
}
</script>

<style scoped>
.paddword {
  margin-top: 10px;
}
</style>
