<template>
	<view>
		<!-- 触发按钮 -->
		<button @click="showCalibrate = true">打开校准器</button>
		<!-- 校准组件 -->
		<elk-calibrate
			v-model="showCalibrate"
			title="自定义标题"
			:defaultValue="value"
			unit="kg"
			:step="1"
			@confirm="handleConfirm"
			:showStep="true"
			:precision="2"
		/>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import ElkCalibrate from '@/components/elk-calibrate/elk-calibrate.vue'

	const showCalibrate = ref(false)
	const value = ref(100)
	
	const handleConfirm = (value) => {
		uni.showToast({
			title: `确定值为：${value}`,
			icon: 'none'
		})
	}
</script>

<style scoped>

</style>