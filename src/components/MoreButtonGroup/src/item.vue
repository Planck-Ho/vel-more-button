<script lang="tsx">
import type { VNode } from 'vue'
import { computed, defineComponent, onBeforeUpdate, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { guid } from './utils'
import { useMoreButtonGroupInject } from './hooks'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'VelMoreButtonItem',
  inheritAttrs: false,
  props: {
    content: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const itemId = `itemId${guid(10)}`
    const { addItem, removeItem, groupProps } = useMoreButtonGroupInject()

    const renderContent = () => (slots.content?.() as unknown as VNode) || props.content
    const innerLoading = ref(false)

    const onClickHandler = async (e: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (computedProps.value.innerLoading) return // 取computedProps，考虑外部设置的innerLoading
      innerLoading.value = true
      try {
        await (attrs as any)?.onClick?.(e)
      }
      finally {
        innerLoading.value = false
      }
    }

    const buttonProps = shallowRef({
      ...attrs,
    })

    const computedProps = computed(() => {
      return {
        innerLoading: innerLoading.value,
        ...buttonProps.value,
        onClick: onClickHandler,
        disabled: props.disabled,
      }
    })

    onBeforeUpdate(() => {
      if (JSON.stringify(buttonProps.value) !== JSON.stringify(attrs)) {
        buttonProps.value = {
          ...attrs,
        }
      }
    })

    onMounted(() => {
      addItem(itemId, {
        id: itemId,
        props: computedProps,
        content: renderContent,
      })
    })
    onUnmounted(() => {
      removeItem(itemId)
    })

    return () => {
      return <ElButton
        size={groupProps.size}
        text={groupProps.text}
        link={groupProps.link}
        key={itemId}
        {...computedProps.value}
        data-item-id={itemId}
      >
        {slots.default?.()}
        {renderContent()}
      </ElButton>
    }
  },
})
</script>
