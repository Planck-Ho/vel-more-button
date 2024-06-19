# VelMoreButtonGroup API Documentation

A more user-friendly button group and dropdown menu developed based on Element Plus

**英文** | [中文](https://github.com/Planck-Ho/vel-more-button/blob/main/README.zh-CN.md)

## Install

```bash
npm install vel-more-button
# Or use pnpm
pnpm install vel-more-button
```

## Usage
```xml
<script setup lang="ts">
import { VelMoreButtonGroup, VelMoreButtonItem } from 'vel-more-button'
</script>

<template>
    <!-- Display up to 3 buttons, and any excess will become a dropdown menu -->
    <VelMoreButtonGroup :max="3">
        <VelMoreButtonItem content="Default" />
        <!--  dropdown menu -->
        <VelMoreButtonItem type="primary" content="Primary">
            <VelMoreButtonItem content="menu1" />
            <VelMoreButtonItem content="menu2">
                <VelMoreButtonItem content="menu2-1" />
                <VelMoreButtonItem content="menu2-2" />
            </VelMoreButtonItem>
            <VelMoreButtonItem content="menu3" />
        </VelMoreButtonItem>
        <VelMoreButtonItem type="success" content="Success" />
        <VelMoreButtonItem type="info" content="Info" />
        <VelMoreButtonItem type="warning" content="Warning" />
        <VelMoreButtonItem type="danger">
            <!-- Customize rendering content through content slots -->
            <template #content>
                <span style="color: red;">Danger</span>
            </template>
        </VelMoreButtonItem>
    </VelMoreButtonGroup>
</template>
```
![demo](./src/assets/more-button.gif)

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

## VelMoreButtonItem Attributes

| Property | Description | Type | Default |
| - | - | - | - |
| content | Button content | <code>string</code> | -
| disabled | Whether it is disabled | <code>boolean</code> | false
| - | Supports other button configuration properties, see the <a href="https://element-plus.org/en-US/component/button.html#button-attributes" target="_blank">el-button</a> documentation for more details. | - | -

## VelMoreButtonItem Events
| Name | Description | Type
| - | - | -
| click | Click on the event. If the bound callback function returns Promise, the loading effect will be automatically added | <code>(e: Event) => void \| Promise<void></code>

## VelMoreButtonItem Slots
| Slot Name | Description | Child Tag |
| - | - | - |
| default | Default slot for dropdown menus, can only contain VelMoreButtonItem | VelMoreButtonItem
| content | Button content | -

## FAQ
### Why use el-cascader for dropdown menus?
<code>el-dropdown</code> does not support multi-level menus, so use <code>el-cascader</code>

### Restrictions on modifying button styles
When the `max` attribute value is `0` and is automatically calculated based on the container width, if you need to modify the button size through CSS, using a child element selector like `.group > .el-button` to change the button size will lead to incorrect `max` calculations. Instead, you should use inline styles `style` or descendant selectors like `.group .el-button` for proper modification.

```xml
<template>
  <VelMoreButtonGroup class="my-button-group">
    <!-- Correct, button size can be set via style attribute -->
    <VelMoreButtonItem content="Button 1" style="width: 100px" />
    <VelMoreButtonItem content="Button 2" type="success" class="my-button-item-1" />
    <VelMoreButtonItem content="Button 3" type="info" class="my-button-item-2" />
  </VelMoreButtonGroup>
</template>
<style>
/* Incorrect, using child element selector causes incorrect max calculation */
.my-button-group > .my-button-item-1{
  width: 100px;
}
/* Correct, using descendant selector allows correct max calculation */
.my-button-group .my-button-item-2{
  width: 100px;
}
</style>
```