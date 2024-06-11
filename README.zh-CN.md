# VelMoreButtonGroup API文档

[英文](./README.md) | **中文**

## VelMoreButtonGroup 属性

| 属性名 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| max | 按钮最大显示数量，默认0通过容器宽度自动计算 | <code>number</code> | 0
| size | 尺寸	| 枚举：'large' 'default'  'small' | -
| text | 是否为文字按钮	| <code>boolean</code> | false
| link | 是否为链接按钮	| <code>boolean</code> | false
| more-text | 更多按钮文本	| <code>string</code> | 更多

## VelMoreButtonGroup 插槽
| 插槽名 | 说明 | 子标签
| - | - | -
| default | 自定义默认内容 | VelMoreButtonItem

## VelMoreButtonItem 属性

| 属性名 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| content | 按钮内容 | <code>string</code> | -
| disabled | 是否禁用 | <code>boolean</code> | false
| - | 支持按钮配置其他属性参考 <a href="https://cn.element-plus.org/zh-CN/component/button.html#button-%E5%B1%9E%E6%80%A7" target="_blanck">el-button</a> | - | -
## VelMoreButtonItem Slots
| 插槽名 | 说明 | 子标签
| - | - | -
| default | 默认插槽，下拉菜单使用，只能放置VelMoreButtonItem | VelMoreButtonItem
| content | 按钮内容 | -