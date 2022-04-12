import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteImagemin from 'vite-plugin-imagemin';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import path from 'path';
// import viteStylelint from '@amatlash/vite-plugin-stylelint';

const isProduction = process.env.NODE_ENV === 'production';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/Chocolate1999/cdn/';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  plugins: [
    react(),
    viteEslint(),
    svgr(),
    // viteStylelint({
    //   // 对某些文件排除检查
    //   exclude: /windicss|node_modules/
    // }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    })
  ],
  server: {
    port: 8801
  }
});
