<script lang="tsx">
import { computed, defineComponent, ref, unref } from 'vue'
import type { PropType } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import type { Item } from './interface'
import { useMoreButtonGroupInject } from './hooks'
import { ElCascader, ElIcon } from 'element-plus'
import MoreButton from './button.vue'
const VueMoreButton = MoreButton as any
const VueElCascader = ElCascader as any

export default defineComponent({
  name: 'VelMoreButtonDropdown',
  inheritAttrs: false,
  props: {
    data: {
      type: Object as PropType<Item>,
      required: true,
    },
  },
  setup(props) {
    const { groupProps } = useMoreButtonGroupInject()

    const cascader = ref()

    const modelValue = ref(null)

    const togglePopperVisible = (isVisible: boolean) => {
      modelValue.value = null
      cascader.value.togglePopperVisible(isVisible)
    }

    const cascaderSlots = {
      default({ data }: { data: Item; node: any }) {
        const p = unref(data.props)
        if (p?.onClick) {
          return <div class={['more-dropdown-button-item', p.innerLoading ? 'show-loading' : '']} key={data.id} onClick={e => p.onClick(e)}>
            {data.content()}
            {
              <ElIcon class="is-loading">
                <Loading />
              </ElIcon>}
          </div>
        }
        return <div class="more-dropdown-button-item" key={data.id}>{data.content()}</div>
      },
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const mapFn = (item: Item) => {
      return {
        value: item.id,
        content: item.content,
        disabled: !!unref(item.props)?.disabled,
        props: item.props,
        children: item.children?.map(mapFn),
      }
    }
    const cascaderOptions = computed(() => {
      return props.data.children?.map(mapFn)
    })

    return () => {
      const modelProps = {
        'modelValue': modelValue.value,
        'onUpdate:modelValue': (val: any) => {
          modelValue.value = val
        },
      }

      return <VueMoreButton class="more-dropdown-reference-button"
        key={props.data.id}
        size={groupProps.size}
        text={groupProps.text}
        link={groupProps.link}
        {...props.data.props}
        onClick={() => togglePopperVisible(true)}
      >
        {props.data.content?.()}
        <div class="more-button-group-dropdown">
          <VueElCascader {...modelProps}
            v-slots={cascaderSlots}
            popper-class="more-button-group-dropdown-popper"
            validate-event={false}
            show-all-levels={false}
            ref={cascader}
            options={cascaderOptions.value}
            size="small"
          />
        </div>
      </VueMoreButton>
    }
  },
})
</script>
