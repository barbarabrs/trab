import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { configure } from 'vee-validate';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { createI18n } from 'vue-i18n';

configure({
  generateMessage: ({ field, rule }) => {
    return `O campo ${field} não é válido para a regra ${rule}.`;
  },
});

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
});

const app = createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');
