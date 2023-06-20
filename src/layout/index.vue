<template>
  <div class="flex bg-[#f0f2f5] relative overflow-y-hidden">
    <commMenu :leftMenu="leftMenu" />
    <div class="layout relative flex-1 overflow-y-scroll h-[100vh] min-w-[1200px]">
      <commHeader :leftMenu="leftMenu" />
      <div class="mx-[10px]">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import commHeader from './components/header.vue'
import commMenu from './components/menu.vue'
import { computed, toRaw } from 'vue'
import { loopRouter } from '@/utils/util'
import { deepClone } from '@yipai-front-end/lib'
import { asyncRouter, baseRouter } from '@/router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
/**
 * 侧边栏
 */
const leftMenu = computed(() => {
  let userRouter = loopRouter(deepClone(asyncRouter), toRaw(auth.asyncRouter))
  return [...baseRouter, ...userRouter]
})
</script>

<style lang="less">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.2s ease-out;
}
</style>
