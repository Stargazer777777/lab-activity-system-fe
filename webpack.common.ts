import * as path from 'path';
import * as webpack from 'webpack';
import yaml from 'yamljs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import WebpackBar from 'webpackbar';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// element plus自动导入
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import YAML from 'yamljs';

const config = (webpackEnv: Record<string, boolean>): webpack.Configuration => {
  const env = process.env['RUNNING_ENV'];
  const envConfig =
    YAML.load(path.resolve(__dirname, `./.env.${env || 'dev'}.yaml`)) || {};
  envConfig['env'] = env;
  return {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js',
      clean: true,
    },
    externals: {
      AMap: 'AMap',
    },
    stats: 'minimal', // 设置控制台展示的信息
    plugins: [
      // 生成html
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new VueLoaderPlugin(), // vue-loader插件,
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
      new WebpackBar(), // 美化进度条
      // eslint
      new ESLintPlugin({
        context: './src/',
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue'],
        fix: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/',
            globOptions: { ignore: ['**/index.html'] }, // 复制public里面的所有内容，除了index.html
          },
        ],
      }),
      new webpack.DefinePlugin({
        'import.meta.env': JSON.stringify(envConfig),
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
        '.jsx',
        '.vue',
        '.scss',
        '.sass',
        '.css',
      ], // 引入这些文件不需要加后缀
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.json',
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.vue',
            '.scss',
            '.sass',
            '.css',
          ], // 这些文件里面可用tsconfig配置的路径别名
        }),
      ],
    },
    module: {
      rules: [
        // 加载图片
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // 加载字体
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        // 加载yaml
        {
          test: /\.(yaml|yml)$/i,
          type: 'json',
          parser: {
            parse: yaml.parse,
          },
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
      ],
    },
  };
};

export default config;
