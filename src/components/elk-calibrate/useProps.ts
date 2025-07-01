// useProps.ts
export const useCalibrateProps = () => {
    return {
        /** 显示隐藏 */
        modelValue: {
            type: Boolean,
            default: false
        },
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
        },
        /** 加减步长 */
        step: {
            type: Number,
            default: 1
        },
        showStep: {
            type: Boolean,
            default: true
        },
        /** 刻度线颜色 */
        scaleColor: {
            type: String,
            default: '#D9D9D9'
        },
        /** 主刻度线颜色 */
        majorScaleColor: {
            type: String,
            default: '#D9D9D9'
        },
        /** 中线颜色 */
        middleLineColor: {
            type: String,
            default: '#22c1b1'
        },
        /** 禁止滑动 */
        disabled: {
            type: Boolean,
            default: false
        },
        /** 取消按钮样式 */
        cancelButtonStyle: {
            type: [Object, String],
            default: () => ({})
        },
        /** 确定按钮样式 */
        confirmButtonStyle: {
            type: [Object, String],
            default: () => ({ backgroundColor: '#4d80f0', color: '#fff' })
        },
        /** 取消按钮类名 */
        cancelButtonClass: {
            type: String,
            default: ''
        },
        /** 确定按钮类名 */
        confirmButtonClass: {
            type: String,
            default: ''
        },
        /** 小数点精度 (0-2) */
        precision: {
            type: Number,
            default: 1,
            validator: (v: number) => [0, 1, 2].includes(v)
        }
    } as const // 使用 as const 保证类型推断
}

// 可选：导出类型
export type CalibrateProps = ReturnType<typeof useCalibrateProps>