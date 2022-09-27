import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/style/base.scss";
import { createI18n } from "vue-i18n";
import messages from "@/locales/locale";
import router from "@/router/index";

const i18n = createI18n({
  allowComposition: true,
  locale: "en",
  messages,
});
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
