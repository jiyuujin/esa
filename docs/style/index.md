# CSS

## UIフレームワーク

- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
- [Element-UI](https://element.eleme.io/#/en-US)
- [Vuetify](https://vuetifyjs.com/ja/)
- [Vuesax](https://lusaxweb.github.io/vuesax/)
- [Quasar](https://quasar.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### bootstrap-vue

bootstrap-vueをインストールします。

```bash
# bootstrap-vue
yarn add bootstrap-vue
```

main.ts で CSSを読み込みます。

```ts
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

#### 注意すること

`b-form-input` で日本語IMEが効かない事象が発生。 (現在は解決している)

[bootstrap-vue 該当issue](https://github.com/bootstrap-vue/bootstrap-vue/issues/2131)
