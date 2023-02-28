import OneTimePassword from "../components/OneTimePassword.vue";
import { plugin, defaultConfig, createInput } from "@formkit/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    plugin,
    defaultConfig({
      inputs: {
        otp: createInput(OneTimePassword, {
          props: ["digits"],
        }),
      },
    })
  );
});
