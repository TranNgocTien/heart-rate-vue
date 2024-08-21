import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import { VueFire } from "vuefire";
// import { firebaseApp } from "./firebaseConfig";
const app = createApp(App);

app.use(router);
// app.use(firebaseApp);
// app.use(VueFire, {
//   firebaseApp,
// });
app.mount("#app");
