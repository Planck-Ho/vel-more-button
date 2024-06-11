import type { InjectionKey } from 'vue'
import { inject, nextTick, provide, ref } from 'vue'
import type { Item } from './interface'
import type { VelMoreButtonGroupProps } from './typing'

const injectionKey = Symbol('moreButtonGroup') as InjectionKey<ReturnType<typeof useMoreButtonnGroupProvider>>
export function useMoreButtonnGroupProvider(props: VelMoreButtonGroupProps) {
  const items = new Map<string, Item>()

  const addItem = (id: string, item: Item) => {
    items.set(id, item)
  }
  const removeItem = (id: string) => {
    items.delete(id)
  }

  const nodes = ref<Item[]>([])

  const forEachChild = (parentEl: Element, parentItem: Item) => {
    const childrenEl = Array.from(parentEl.children)
    if (childrenEl.length) {
      parentItem.children = []
      childrenEl.forEach((child) => {
        const id = child.getAttribute('data-item-id')
        const item = id ? items.get(id) : null
        if (item) {
          (parentItem.children as Item[]).push(item)
          forEachChild(child, item)
        }
        else {
          forEachChild(child, parentItem)
        }
      })
    }
  }

  let updateItemMax = null as number | null | string
  const _updateItems = (containerEl: Element, contentEl: Element): number => {
    if (!contentEl) {
      nodes.value = []
      return 0
    }
    const buttonList: Item[] = []
    const { left: containerLeft, width: containerWidth } = containerEl.getBoundingClientRect()
    const calculateMax = (children: Element[], width: number) => {
      let maxVal = 0
      for (const child of children) {
        const { right } = child.getBoundingClientRect()
        const w = Math.ceil(right - containerLeft)
        if (w > width) {
          break
        }
        maxVal++
      }
      return maxVal
    }

    const getMax = () => {
      // @ts-expect-error
      const max = Math.trunc(+props.max)
      // 自动计算
      if (max < 1) {
        const children = Array.from(contentEl.children)
        const m = calculateMax(children, containerWidth)
        if (m === children.length) return m
        const moreIdx = nodes.value.findLastIndex(item => item.id === 'more')
        if (moreIdx > -1) {
          const containerChildrenBtns = Array.from(containerEl.parentElement?.children ?? []).filter(childNode => childNode.tagName.toUpperCase() === 'BUTTON')
          const moreBtn = containerChildrenBtns[moreIdx]
          const { right: moreBtnRight } = moreBtn.getBoundingClientRect()
          let moreSpace = moreBtnRight - containerLeft
          if (containerChildrenBtns.length > 1) {
            const preBtn = containerChildrenBtns[moreIdx - 1]
            const { right: preBtnRight } = preBtn.getBoundingClientRect()
            // 计算更多按钮占据的空间
            moreSpace = moreBtnRight - preBtnRight + 1
          }
          return calculateMax(children, containerWidth - moreSpace) + 1 // 1为更多按钮
        }
        return m
      }
      return max
    }
    const max = getMax()
    if (updateItemMax === max) {
      return max
    }
    updateItemMax = max
    const children = Array.from(contentEl.children)
    let buttons: Element[] = [...children]
    let moreButtons: Element[] = []
    if (max > 0 && children.length > max) {
      const sliceEnd = max - 1
      buttons = children.slice(0, sliceEnd)
      moreButtons = children.slice(sliceEnd)
    }

    buttons
      .forEach((child) => {
        const id = child.getAttribute('data-item-id')
        const item = id ? items.get(id) : null
        if (item) {
          buttonList.push(item)
          forEachChild(child, item)
        }
      })

    // 添加更多按钮
    if (moreButtons.length) {
      const moreItem: Item = {
        id: 'more',
        content: () => props.moreText as string,
        children: [],
      }
      moreButtons.forEach((child) => {
        const id = child.getAttribute('data-item-id')
        const item = id ? items.get(id) : null
        if (item) {
          (moreItem.children as Item[]).push(item)
          forEachChild(child, item)
        }
      })
      buttonList.push(moreItem)
    }
    nodes.value = buttonList
    return max
  }

  const updateItems = async (containerEl: Element, contentEl: Element) => {
    let hasMore = nodes.value.findLastIndex(item => item.id === 'more') > -1

    if (hasMore) {
      return _updateItems(containerEl, contentEl)
    }
    _updateItems(containerEl, contentEl)
    hasMore = nodes.value.findLastIndex(item => item.id === 'more') > -1
    // 从无到有，得到更多按钮尺寸，再计算一次
    if (hasMore) {
      await nextTick()
      _updateItems(containerEl, contentEl)
    }
  }

  const providerObj = {
    updateItems,
    addItem,
    removeItem,
    nodes,
    groupProps: props,
  }
  provide(injectionKey, providerObj)

  return providerObj
}

export function useMoreButtonGroupInject() {
  const providerObj = inject(injectionKey) as ReturnType<typeof useMoreButtonnGroupProvider>
  return {
    ...providerObj,
  }
}