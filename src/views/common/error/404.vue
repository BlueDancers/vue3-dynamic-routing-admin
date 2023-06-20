<template>
  <div class="flex items-center flex-col h-[100vh] bg-[#f0f2f5] pt-50">
    <SvgIcon class="w-[300px] h-[300px]" name="app/404"></SvgIcon>
    <p class="text-[#00000073] mt-10">抱歉,你访问的页面不存在</p>
    <a-button class="mt-10" type="primary" @click="goBack">返回首页</a-button>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/svgIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
  router.replace({ name: 'dashboard' })
}
</script>

<style scoped></style>
