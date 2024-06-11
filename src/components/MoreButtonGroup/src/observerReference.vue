<script setup lang="ts">
import { debounce } from './utils'
import { onMounted, onUnmounted, ref } from 'vue'
import { useMoreButtonGroupInject } from './hooks'

const { updateItems } = useMoreButtonGroupInject()

const containerEl = ref<HTMLElement | null>(null)

let containerObserver: ResizeObserver | null = null
// 内容的元素
const contentEl = ref<HTMLElement | null>(null)

let contentObserver: ResizeObserver | null = null

const checkOverflow = debounce(() => {
  updateItems(containerEl.value as HTMLElement, contentEl.value as HTMLElement)
}, 50)

onMounted(() => {
  let containerW = 0
  containerObserver = new ResizeObserver(([entrie]) => {
    const clientWidth = entrie.target.clientWidth
    if (containerW === clientWidth) {
      return
    }
    containerW = clientWidth
    checkOverflow()
  })
  let contentW = 0

  contentObserver = new ResizeObserver(([entrie]) => {
    const clientWidth = entrie.target.clientWidth
    if (contentW === clientWidth) {
      return
    }
    contentW = clientWidth
    checkOverflow()
  })
  containerObserver.observe(containerEl.value as HTMLElement)
  contentObserver.observe(contentEl.value as HTMLElement)
})

onUnmounted(() => {
  containerObserver?.disconnect()
  contentObserver?.disconnect()
})
</script>

<template>
  <div ref="containerEl" class="vel-more-button-group">
    <div ref="contentEl" class="vel-more-button-group-buttons">
      <slot />
    </div>
  </div>
</template>
