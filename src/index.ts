// src/index.ts

import { App, defineComponent } from 'vue';
import CalibrateScale from './components/elk-calibrate/elk-calibrate.vue';
import './components/elk-calibrate/index.css';

// 定义组件
const ElkCalibrate = defineComponent({
    ...CalibrateScale,
    name: 'ElkCalibrate' // 显式设置组件名
});

// 1. 导出默认组件 (最常见用法)
export default ElkCalibrate;

// 2. 导出安装函数 (支持 app.use())
export const install = (app: App) => {
    app.component('ElkCalibrate', ElkCalibrate);
};


// 4. 导出命名组件 (可选)
export { ElkCalibrate };