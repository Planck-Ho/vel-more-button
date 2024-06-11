<script lang="tsx">
import './style.scss'
import { defineComponent } from 'vue'
import { useMoreButtonnGroupProvider } from './hooks'
import type { VelMoreButtonGroupProps } from './typing'
import ObserverReference from './observerReference.vue'
import MoreButton from './button.vue'
import Dropdown from './dropdown.vue'
import type {  PropType } from 'vue'

export default defineComponent({
  name: 'VelMoreButtonGroup',
  inheritAttrs: false,
  props: {
    size: {
      type: String as PropType<VelMoreButtonGroupProps['size']>,
      default: '',
    },
    text: {
      type: Boolean as PropType<VelMoreButtonGroupProps['text']>,
      default: false,
    },
    link: {
      type: Boolean as PropType<VelMoreButtonGroupProps['link']>,
      default: false,
    },
    max: {
      type: Number as PropType<VelMoreButtonGroupProps['max']>,
      default: 0,
    },
    moreText: {
      type: String as PropType<VelMoreButtonGroupProps['moreText']>,
      default: '更多',
    },
  },
  setup(props, { slots, attrs }) {
    const { nodes } = useMoreButtonnGroupProvider(props)

    return () => {
      const buttons = nodes.value.map((node) => {
        if (node.children && node.children.length > 0) {
          return <Dropdown data={node} key={node.id} />
        }
        return <MoreButton
          key={node.id}
          text={props.text}
          link={props.link}
          size={props.size}
          {...node.props}
        >{node.content()}</MoreButton>
      })

      return <div class="vel-more-button-constainer" {...attrs}>
        <ObserverReference>
          {slots.default?.()}
        </ObserverReference>
        {buttons}
      </div>
    }
  },
})
</script>
