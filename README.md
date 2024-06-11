# VelMoreButtonGroup API Documentation

**英文** | [中文](./README.zh-CN.md)

## VelMoreButtonGroup Properties

| Property | Description | Type | Default |
| - | - | - | - |
| max | Maximum number of buttons displayed. Default is 0, which allows automatic calculation based on container width. | <code>number</code> | 0
| size | Size | Enum: 'large' 'default' 'small' | -
| text | Whether it is a text button | <code>boolean</code> | false
| link | Whether it is a link button | <code>boolean</code> | false
| more-text | Text for the "more" button | <code>string</code> | 更多

## VelMoreButtonGroup Slots
| Slot Name | Description | Child Tag |
| - | - | - |
| default | Custom default content | VelMoreButtonItem

## VelMoreButtonItem Properties

| Property | Description | Type | Default |
| - | - | - | - |
| content | Button content | <code>string</code> | -
| disabled | Whether it is disabled | <code>boolean</code> | false
| - | Supports other button configuration properties, see the <a href="https://element-plus.org/en-US/component/button.html#button-attributes" target="_blank">el-button</a> documentation for more details. | - | -

## VelMoreButtonItem Slots
| Slot Name | Description | Child Tag |
| - | - | - |
| default | Default slot for dropdown menus, can only contain VelMoreButtonItem | VelMoreButtonItem
| content | Button content | -