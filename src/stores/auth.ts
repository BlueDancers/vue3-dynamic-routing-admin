import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import router from '@/router/index'
import { removeStorage } from '@yipai-front-end/lib'

const baseRouterName = ['dashboard']
export const useAuthStore = defineStore(
  'router',
  () => {
    const isLogin = ref(false) // 是否登录
    const asyncRouter: Ref<string[]> = ref([]) // 当前用户拥有的权限
    const userInfo = ref({
      name: 'admin', // 账户名称
    })
    function getAsyncRouer(name: string) {
      console.log(123, name)
      // 真实逻辑为通过接口获取当前用户的router配置,name这个参数也是不需要的
      let asyncRouters: string[] = []
      if (name == 'admin') {
        asyncRouters = ['goods', 'goodsAdd']
      } else if (name == 'user') {
        asyncRouters = ['user', 'userList']
      }
      asyncRouter.value.push(...baseRouterName, ...asyncRouters)
      console.log(asyncRouter.value)
    }

    function logout() {
      asyncRouter.value = []
      isLogin.value = false
      removeStorage('authorization')
      router.replace({
        name: 'login',
      })
    }

    return {
      isLogin,
      userInfo,
      asyncRouter,
      getAsyncRouer,
      logout,
    }
  },
  {
    persist: true,
  }
)
