import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import './scss/_index.scss';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

const asyncRegister = async () => {
  const { default: store } = await import('./stores/index');
  app.use(store);

  const { default: router } = await import('./router/index');
  app.use(router);

  app.mount('#app');
};
asyncRegister();
