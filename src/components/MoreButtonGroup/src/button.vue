<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'
interface Props {
  onClick?: (evt: MouseEvent) => any
  innerLoading?: boolean
}
defineProps<Props>()

defineOptions({
  name: 'VelMoreButton',
})
</script>

<template>
  <el-button class="more-button" :class="{ 'show-loading': innerLoading }" @click="onClick">
    <template #default>
      <slot />
      <span v-if="innerLoading" class="loading-icon">
        <ElIcon class="is-loading">
          <Loading />
        </ElIcon>
      </span>
    </template>
  </el-button>
</template>
