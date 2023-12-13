import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n'; // Verifique se está importando corretamente o createI18n


const app = createApp(App);
app.use(router);
const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
});
app.use(i18n);

app.mount('#app');
