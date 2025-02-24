## 一、组件概述



本组件是一个用于校准的前端组件，支持多种单位和自定义刻度，可在移动应用开发中方便地集成使用，为用户提供直观的校准操作界面。

### 组件效果展示

![Snipaste_2025-02-24_13-58-12](src\static\img.png)



## 二、安装与使用

### 1. 安装



本组件为 Vue 3 组件，确保你的项目是基于 Vue 3 开发的。将组件的代码文件（`.vue` 文件）复制到你的项目对应的组件目录下即可。

### 2. 使用示例

```vue
<template>
  <div>
    <!-- 引入校准组件 -->
    <Calibrate 
      :defaultValue="10"
      :unit="'mm'"
      :scaleNum="200"
      @hide="handleHide"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import Calibrate from './path/to/calibrate.vue';

const handleHide = () => {
  console.log('组件隐藏');
};

const handleConfirm = (value) => {
  console.log('确认的值：', value);
};
</script>
```

## 三、组件属性



| 属性名       | 类型    |  默认值   | 说明                                                         |
| ------------ | ------- | -------- | ------------------------------------------------------------ |
| title        | String  | ' 编辑' | 组件标题，显示在组件顶部                                     |
| defaultValue | Number  | 0       | 校准的默认值                                                 |
| unit         | String  | 'cm'    | 校准值的单位，可自定义，如 'cm'、'mm' 等                     |
| scaleNum     | Number  | 330     | 刻度总数，单位为最小刻度单位，例如若单位为 'cm'，则默认有 330 个刻度 |
| cancelText   | String  | ' 取消' | 取消按钮的显示文案                                           |
| confirmText  | String  | ' 确定' | 确定按钮的显示文案                                           |
| showCloseBtn | Boolean | true    | 是否显示关闭按钮                                             |
| showTitle    | Boolean | true    | 是否显示标题                                                 |

## 四、组件事件



| 事件名  | 说明                                         | 回调参数                   |
| ------- | -------------------------------------------- | -------------------------- |
| hide    | 当点击取消按钮或关闭按钮时触发，用于隐藏组件 | 无                         |
| confirm | 当点击确定按钮时触发，返回当前校准的值       | 当前校准的值（字符串类型） |



## 五、注意事项



- 确保项目中使用的 Vue 版本为 3.x，否则可能会出现兼容性问题。
- 刻度总数 `scaleNum` 应根据实际需求合理设置，避免刻度过多或过少影响用户体验。
- 组件的样式可根据项目整体风格进行调整，修改 `<style scoped>` 部分的 CSS 代码即可。
