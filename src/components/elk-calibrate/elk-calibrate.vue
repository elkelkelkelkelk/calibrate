<template>
  <view class="calibrate-container" v-if="modelValue">
    <view class="mask" @click="hide"></view>
    <view class="calibrated-scale-container flex-col self-center section_8 space-y-8">
      <view class="flex-col section_9 space-y-8">
        <view class="calibrate-top">
          <view class="calibrate-title" v-if="showTitle">{{ title }}</view>
          <view class="calibrate-close" v-if="showCloseBtn" @click="hide">✖</view>
        </view>
        <view class="calibrate-value-row" :class="{'step-active': showStep && !disabled}">
          <view class="calibrate-step" @click="decrement" v-if="showStep && !disabled">-</view>
          <view>
            <text class="calibrate-value">{{ val }}</text>
            <text class="calibrate-unit">{{ unit }}</text>
          </view>
          <view class="calibrate-step" @click="increment" v-if="showStep && !disabled">+</view>
        </view>
        <view class="section_11 space-y-4">
          <view class="cur">
            <view class="cur_val"></view>
          </view>
          <scroll-view
            :scroll-x="!disabled"
            :scroll-left="scrollLeft"
            scroll-with-animation="true"
            :scroll-animation-duration="300"
            @scroll="bindscroll"
            :throttle="false"
            :enhanced="true"
            :show-scrollbar="false"
          >
            <view class="cursor_box">
              <view :class="index % 10 == 0 ? 'cursor_lang' : 'cursor'" v-for="(item, index) in scaleNum" :key="index"  :style="index === 0 ? 'margin-left: calc(50vw - 32rpx);' : ''">
                <view v-if="index % 10 == 0" class="cursor_text">{{ index }}</view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="button-row">
          <button 
            type="button" 
            @click="hide"
            :style="cancelButtonStyle"
            :class="['cancel-btn', cancelButtonClass]"
          >{{ cancelText }}</button>

          <button 
            type="button" 
            @click="confirm"
            :style="confirmButtonStyle"
            :class="['confirm-btn', confirmButtonClass]"
          >{{ confirmText }}</button>
        </view>
      </view>
    </view>
  </view>
      
  </template> 
  
  <script lang="ts">
  export default {
    name: 'ElkCalibrate',
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
  </script>

  <script setup lang="ts">
  import { ref, onMounted,defineProps,defineEmits } from 'vue';
  import { useCalibrateProps } from './useProps'

  const props = defineProps(useCalibrateProps() as any)
  
  const emit = defineEmits<{
    (e: 'hide'): void
    (e: 'confirm', value: string): void
    (e: 'update:modelValue', value: boolean): void
  }>()

  const val = ref(props.defaultValue.toString() || '0');
  const screenWidth = ref(0);
  const scrollLeft = ref(0);
  
  onMounted(() => {
    if (typeof uni !== 'undefined' && uni.getSystemInfoSync) {
      screenWidth.value = uni.getSystemInfoSync().screenWidth;
    } else {
      screenWidth.value = window.innerWidth;
    }
    calcScrollLeft();
  });
  
  const bindscroll = (e:any) => {
    // 移动距离
    let left = e.detail.scrollLeft;
    let curVal = (left / 10).toFixed(props.precision);
    val.value = curVal;
  }
  
  const calcScrollLeft = () => {
    let left = +val.value * 10;
    scrollLeft.value = left;
  }
  
  const hide = () => {
    emit('update:modelValue', false)
    emit('hide');
  }
  
  const confirm = () => {
    emit('confirm', val.value);
  }

  const increment = () => {
    const newValue = parseFloat(val.value) + props.step
    val.value = Math.min(newValue, props.scaleNum).toFixed(props.precision)
    calcScrollLeft()
    // uni.vibrateShort() 
  }

  const decrement = () => {
    const newValue = parseFloat(val.value) - props.step
    val.value = Math.max(newValue, 0).toFixed(props.precision)
    calcScrollLeft()
    // uni.vibrateShort() 
  }
  </script>
  
<style scoped>
  @import './index.css';
  .cur_val {
    border-right: 2px v-bind('props.middleLineColor') solid;
  }
  .cursor {
    border-left: 1px v-bind('props.scaleColor') solid;
  }
  .cursor_lang {
    border-left: 2px v-bind('props.majorScaleColor') solid;
  }
</style>