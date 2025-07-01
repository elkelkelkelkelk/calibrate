<template>
  <view class="calibrate-container">
    <view class="mask" @click="hide"></view>
    <view class="calibrated-scale-container flex-col self-center section_8 space-y-8">
      <view class="flex-col section_9 space-y-8">
        <view class="calibrate-top">
          <view class="calibrate-title" v-if="showTitle">{{ title }}</view>
          <view class="calibrate-close" v-if="showCloseBtn" @click="hide">✖</view>
        </view>
        <view class="calibrate-value-row">
          <text class="calibrate-value">{{ val }}</text>
          <text class="calibrate-unit">{{ unit }}</text>
        </view>
        <view class="section_11 space-y-4">
          <view class="cur">
            <view class="cur_val"></view>
          </view>
          <scroll-view
            scroll-x="true"
            :scroll-left="scrollLeft"
            scroll-with-animation="true"
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
          <button type="default" @click="hide">{{ cancelText }}</button>
          <button type="primary" @click="confirm">{{ confirmText }}</button>
        </view>
      </view>
    </view>
  </view>
      
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted,defineProps,defineEmits } from 'vue';
  const props = defineProps({
    /** 标题 */
    title: {
      type: String,
      default: '编辑'
    },
    /** 默认值 */
    defaultValue: {
      type: Number,
      default: 0
    },
    /** 单位 */
    unit: {
      type: String,
      default: 'cm'
    },
    /** 刻度总数，单位：cm，默认330cm，即330/10=33个刻度值 */
    scaleNum: {
      type: Number,
      default: 330
    },
    /** 取消按钮文案 */
    cancelText: {
      type: String,
      default: '取消'
    },
    /** 确定按钮文案 */
    confirmText: {
      type: String,
      default: '确定'
    },
    /** 是否显示关闭按钮 */
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    /** 是否显示标题 */
    showTitle: {
      type: Boolean,
      default: true
    }
  });
  
  const emit = defineEmits(['hide', 'confirm']);
  
  const val = ref(props.defaultValue.toString() || '0');
  const screenWidth = ref(0);
  const scrollLeft = ref(0);
  
  onMounted(() => {
    screenWidth.value = uni.getSystemInfoSync().screenWidth;
    calcScrollLeft();
  });
  
  const bindscroll = (e:any) => {
    // 移动距离
    let left = e.detail.scrollLeft;
    let curVal = (left / 10).toFixed(1);
    val.value = curVal;
  }
  
  const calcScrollLeft = () => {
    let left = +val.value * 10;
    scrollLeft.value = left;
  }
  
  function hide() {
    uni.showToast({
      title: '点击取消',
      icon: 'none'
    });
    emit('hide');
  }
  
  const confirm = () => {
    uni.showToast({
      title: '点击确定',
      icon: 'none'
    });
    emit('confirm', val.value);
  }
  </script>
  
  <style scoped>
  * {
      margin: 0;
      padding: 0;
  }
  /* components/calibrated-scale/calibrated-scale.wxss */
  .calibrate-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 15;
    .mask {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      opacity: 0.6;
      background: #000000;
    }
  }
  
  .calibrated-scale-container {
    width: 100%;
    bottom: 0;
    position: absolute;
  }
  .calibrate-top{
    display: flex;
    position: relative;
    margin: 30rpx 0 80rpx;
  }
  .calibrate-title {
    text-align: center;
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .calibrate-close{
    position: absolute;
    right: 10rpx;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40rpx;
  }
  .calibrate-value-row {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 36rpx;
    .calibrate-value {
      font-size: 60rpx;
      font-weight: bold;
      line-height: 60rpx;
      color: #333333;
    }
    .calibrate-unit {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  
  .justify-evenly {
    justify-content: space-evenly;
  }
  
  .items-center {
    align-items: center;
  }
  
  .self-center {
    align-self: center;
  }
  
  .section_9 {
    width: calc(100% - 64rpx);
    padding: 32rpx;
    background-color: #ffffff;
    overflow: hidden;
    border-top: solid 2.08rpx #d4d4d4;
  }
  
  .space-y-8>view:not(:first-child),
  .space-y-8>text:not(:first-child),
  .space-y-8>image:not(:first-child) {
    margin-top: 16.67rpx;
  }
  
  .section_10 {
    padding: 8.33rpx 0;
    background-color: #ffffff;
    overflow: hidden;
    width: 197.92rpx;
  }
  
  .font_2 {
    font-size: 29.17rpx;
    font-family: HarmonyOS Sans SC;
    line-height: 27.08rpx;
    color: #000000e6;
  }
  
  .section_11 {
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    height: 150rpx;
  }
  
  .space-y-4>view:not(:first-child),
  .space-y-4>text:not(:first-child),
  .space-y-4>image:not(:first-child) {
    margin-top: 8.33rpx;
  }
  
  
  .cur {
    position: absolute;
    width: 100%;
    height: 38px;
    z-index: 10;
    display: flex;
    pointer-events: none;
  }
  
  .cur_val {
    width: calc(50vw - 32rpx);
    border-right: 2px #22c1b1 solid;
  }

  .cursor_box{
    background: white; 
    justify-content: center;
    align-items: flex-start; 
    display: inline-flex;
    margin-right: calc(50vw - 32rpx);
  }
  
  .cursor {
    width: 9px;
    height: 24px;
    border-left: 1px #D9D9D9 solid;
  }
  
  .cursor_lang {
    width: 8px;
    height: 32px;
    border-left: 2px #D9D9D9 solid;
  }
  
  .cursor_text {
    color: #B3B3B3;
    font-size: 12px;
    font-family: HarmonyOS Sans SC;
    font-weight: 400;
    line-height: 12px;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    margin-top: 80rpx;
    width: 80rpx;
    margin-left: -40rpx;
  }
  
  .button-row {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 64rpx;
    button {
      width: 240rpx;
    }
  }
  </style>