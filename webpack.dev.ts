import path from 'path';
import * as webpack from 'webpack';
interface DevWebpackConfig extends webpack.Configuration {
  devServer?: any;
}

export default (): DevWebpackConfig => {
  return {
    extends: ['webpack.common.ts'],
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      static: path.resolve('./dist'),
      port: 5173,
      compress: true,
      historyApiFallback: true,
      client: {
        logging: 'info',
        overlay: false,
        progress: true,
        reconnect: true,
      },
      proxy: {
        '/javaDevApi': {
          target: 'http://localhost:30000',
          pathRewrite: { '^/javaDevApi': '' },
          secure: false,
        },
        '/nestDevApi': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/nestDevApi': '' },
          secure: false,
        },
        '/javaProdApi': {
          target: 'http://124.220.92.234:30000',
          pathRewrite: { '^/javaProdApi': '' },
          secure: false,
        },
        '/nestProdApi': {
          target: 'http://150.158.18.90:30006',
          pathRewrite: { '^/nestProdApi': '' },
          secure: false,
        },
      },
    },
    module: {
      rules: [
        // sass/css
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            {
              loader: 'style-loader',
            },
            // 将 CSS 转化成 CommonJS 模块,
            {
              loader: 'css-loader',
              options: {
                // 开启 CSS Modules
                // modules: true,
                // modules: {
                //   localIdentName: '[local]_[hash:base64:8]',
                // },
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // 其他选项
                      },
                    ],
                  ],
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
      ],
    },
  };
};
