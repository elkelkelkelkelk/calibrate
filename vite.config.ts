// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import { resolve } from "path";

// export default defineConfig({
//   plugins: [vue()],

//   build: {
//     lib: {
//       // 指定库的入口文件
//       entry: resolve(__dirname, "src/index.ts"),
//       name: "CalibrateScale",
//       // 生成的文件名格式
//       fileName: (format) => `calibrate-scale.${format}.js`,
//       // 输出的模块格式
//       formats: ["es", "umd"]
//     },
//     rollupOptions: {
//       // 将 Vue 设置为外部依赖
//       external: ["vue"],
//       output: {
//         // 全局变量名
//         globals: {
//           vue: "Vue"
//         }
//       }
//     },
//     // 生成 sourcemap
//     sourcemap: true,
//     // 压缩代码
//     minify: true
//   },
// });
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
});