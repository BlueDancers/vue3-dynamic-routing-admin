import dayjs from 'dayjs'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'

/**
 * 获取可访问路由树
 * @param tree
 */
export function loopRouter(tree: RouteRecordRaw[], asyncRouter: RouteRecordName[]) {
  for (let i = 0, len = tree.length; i < len; i++) {
    let item = tree[i]
    if (asyncRouter.includes(item.name!) && item.meta!.showMenu) {
      if (item.children) {
        item.children = loopRouter(item.children!, asyncRouter)
      }
    } else {
      tree.splice(i, 1)
      len = tree.length // 刷新循环长度
      if (i < tree.length) {
        // 删除后,数组长度-1,数组的下一位前进了一位,所以一旦splice掉不存在的权限,便需要i--,否则会跳过下一位
        i--
      }
    }
  }
  // 将菜单按照当前拥有权限asyncRouter的顺序排序
  return tree.sort((a: any, b: any) => asyncRouter.indexOf(a.name) - asyncRouter.indexOf(b.name))
}

/**
 * 获取指定天数内的 开始 结束 时间戳
 * @param type
 */
export function getTimeType(day: number) {
  let endTime = dayjs().set('h', 23).set('m', 59).set('s', 59)

  let oneDay = 86400000
  let endDay = endTime.valueOf() - day * oneDay
  let startTime = dayjs(endDay).set('h', 0).set('m', 0).set('s', 0)

  return {
    startTime,
    endTime,
  }
}
