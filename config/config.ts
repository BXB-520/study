/**
 * @Author: BX
 * @Date:   2022-06-07 11:19:29
 * @Last Modified by:   BX
 * @Last Modified time: 2022-06-07 13:59:27
 */
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: './',
  outputPath: 'www',
  targets: {
    ie: 9,
  },
  // antd: {
  //   mobile: false//关闭umi的antd-mobile
  // },
  /**
   * Umi 默认编译 node_modules 下的文件，带来一些收益的同时，也增加了额外的编译时间。
   * 如果不希望 node_modules 下的文件走 babel 编译，可通过以下配置减少 40% 到 60% 的编译时间。
   */
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  routes,
  fastRefresh: {},

  // 使用最低成本的 sourcemap 生成方式，默认是 cheap-module-source-map
  devtool: 'eval',
  // antd:{},
});
