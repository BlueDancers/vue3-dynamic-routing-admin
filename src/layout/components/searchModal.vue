<template>
  <a-modal :visible="searchRouterVisible" title="搜索" :footer="null" @cancel="closeSearch">
    <div>
      <a-input-search
        @keydown="searKeyDown"
        v-model:value="searchValue"
        placeholder="请输入需要查询的内容"
        size="mini"
        @change="changevSearval"
        @search="enterSearch"
      >
        <template #enterButton>
          <a-button type="primary">搜索</a-button>
        </template>
      </a-input-search>
      <a-empty v-if="searchRes.length == 0" class="mt-40" :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      <div class="mt-10" v-else>
        <div
          v-for="(item, index) in searchRes"
          :key="item.name"
          class="flex items-center justify-between px-[10px] py-[10px] base_hover rounded-md cursor-pointer"
          @click="gotoSearRouter(item.name)"
          :class="activeSearRes == index ? 'bg-[#b8b8b833]' : ''"
        >
          <span>{{ item.title }}</span>
          <svgIcon class="w-[16px] h-[16px]" name="icon/left-arrow" color="var(--primary-color)"></svgIcon>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Empty, message } from 'ant-design-vue'
import { ref, type Ref } from 'vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'

const router = useRouter()

const props = defineProps<{ leftMenu: RouteRecordRaw[] }>()

const searchRouterVisible = ref()
const searchValue = ref('')
const searchRes: Ref<{ name: string; title: string }[]> = ref([]) // 搜索结果
const activeSearRes = ref(0) // 搜索结果激活项

function changevSearval(e) {
  let value = searchValue.value
  if (!value) {
    searchRes.value = []
    return
  }
  function loopSearchRes(list: RouteRecordRaw[]) {
    list.map((e) => {
      let title: string = e.meta!.title as string
      if (title.includes(value)) {
        res.push({ name: String(e.name), title })
      }
      if (e.children) {
        loopSearchRes(e.children)
      }
    })
  }
  let res: { name: string; title: string }[] = []
  loopSearchRes(props.leftMenu)
  if (res.length == 0) {
    message.info('未搜索到相关内容')
  }
  searchRes.value = res
}

function gotoSearRouter(name) {
  router.push({ name })
  closeSearch()
}

function closeSearch() {
  searchRouterVisible.value = false
  searchValue.value = ''
  searchRes.value = []
}

function searKeyDown(e) {
  if (e.code == 'ArrowDown') {
    e.preventDefault()
    if (activeSearRes.value == searchRes.value.length - 1) return
    activeSearRes.value++
  } else if (e.code == 'ArrowUp') {
    e.preventDefault()
    if (activeSearRes.value == 0) return
    activeSearRes.value--
  }
}

function enterSearch() {
  if (searchRes.value.length == 0) return
  gotoSearRouter(searchRes.value[activeSearRes.value].name)
}

function open() {
  searchRouterVisible.value = true
}

defineExpose({
  open,
})
</script>

<style scoped></style>
