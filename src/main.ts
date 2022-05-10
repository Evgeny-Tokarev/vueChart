import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/base.css";
import { createI18n } from "vue-i18n";
import messages from "@/components/locale";
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
console.log(i18n.global.locale);

export { i18n };
