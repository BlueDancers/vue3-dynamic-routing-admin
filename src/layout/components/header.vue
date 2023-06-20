<template>
  <div
    class="layout_header flex-1 box-border h-[50px] flex justify-between items-center pr-[16px] bg-white sticky top-0 z-50"
  >
    <div class="flex items-center h-[100%]">
      <div
        class="flex items-center ml-20 h-[100%] cursor-pointer"
        @click="toggleShowMenu"
        v-if="routers.length > 2"
      >
        <SvgIcon
          class="w-[20px] h-[20px]"
          :class="style.showChildMenu ? 'rotate-0' : 'rotate-180'"
          name="app/arrow"
        />
      </div>
      <div class="ml-[20px] flex cursor-pointer select-none">
        <div v-for="(item, index) in routers" :key="item.name">
          <headerRouter :routerList="routers" :routeItem="item" :index="index"></headerRouter>
        </div>
      </div>
    </div>
    <div class="h-[100%] flex items-center select-none bg-white">
      <div class="px-[10px] h-[100%] base_hover flex items-center ml-[10px]" @click="app.reset">
        <SvgIcon class="w-[18px] h-[18px]" name="app/update" />
      </div>
      <div class="px-[10px] h-[100%] base_hover flex items-center ml-[10px]" @click="searchRouter">
        <SvgIcon class="w-[18px] h-[18px]" name="app/search" />
      </div>
      <div class="px-[10px] h-[100%] base_hover flex items-center ml-[10px]">
        <SvgIcon class="w-[18px] h-[18px]" name="app/message" />
      </div>

      <a-dropdown>
        <div class="flex items-center h-[100%] px-[10px] base_hover">
          <img
            class="w-[28px] h-[28px] rounded-[20px]"
            src="https://images.591wsh.com/2023/03/09/1678344055132.png"
          />
          <span class="ml-[10px] text-[16px] cursor-pointer">{{ auth.userInfo.name }}</span>
        </div>
        <template #overlay>
          <a-menu @click="onUserClick">
            <a-menu-item key="1">复制账号</a-menu-item>
            <a-menu-item key="2">修改密码</a-menu-item>
            <a-menu-item key="3">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <searchModal ref="searchModalRef" :left-menu="props.leftMenu"></searchModal>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import SvgIcon from '@/components/svgIcon.vue'
import searchModal from './searchModal.vue'
import { computed, ref } from 'vue'
import headerRouter from './headerRouter.vue'
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { useStyleStore } from '@/stores/style'
import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue'

const props = defineProps<{ leftMenu: RouteRecordRaw[] }>()

const route = useRoute()
const searchModalRef = ref()

const auth = useAuthStore()
const app = useAppStore()
const style = useStyleStore()
const { toClipboard } = useClipboard()

let routers = computed(() => {
  return route.matched
})

function onUserClick(val) {
  if (val.key == '1') {
    toClipboard('123').then(() => {
      message.success('复制成功')
    })
  } else if (val.key == '3') {
    auth.logout()
  }
}

function toggleShowMenu() {
  style.showChildMenu = !style.showChildMenu
}

function searchRouter() {
  searchModalRef.value.open()
}
</script>

<style lang="less" scoped>
.layout_header {
  border-bottom: 1px solid #eee;
  // headerRouter 组件
  :deep(.ant-popover-inner-content) {
    padding: 0px !important;
  }
}

.base_hover {
  &:hover {
    background-color: #b8b8b833;
  }
}
</style>
