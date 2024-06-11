import type { VNode, Ref } from 'vue'

export type ItemContent = () => VNode | string

export type Item = {
  id: string
  content: ItemContent
  props?: Ref<any>
  children?: Item[]
}
