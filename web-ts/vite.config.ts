import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 配置需要使用的插件列表，这里将vue添加进去
  server: {
    // 配置network（允许192.168访问）
    host: '0.0.0.0',
    // 你需要定义的端口号
    port: 5124,
    // 配置本地代理地址（仅在dev有效）
    proxy: {
      '/dev': 'http://127.0.0.1:2333',
      // '/api': {
      //   target: 'http://xxx.xxx.com/api',   //代理接口
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },
  // 配置文件别名 vite1.0是/@/  2.0改为/@
  // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
  resolve: {
    alias: {
      "/@": pathResolve("src"),
    }
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser' // 混淆器，terser构建后文件体积更小
  },
  // build后的地址（项目地址）
  base: './'
})