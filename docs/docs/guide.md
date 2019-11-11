# ガイド

[フロント・サーバ構築手順書](https://webneko.dev/posts/the-development-guide-for-fullstack-engineers)

## Vue.js

- [Vueインスタンスを生成する](https://jp.vuejs.org/v2/guide/instance.html)
- [個別のDOMに突っ込んで描画する](https://webneko.dev/posts/design-vue-components-to-individual-dom)

### Vue CLI

レガシー環境は特に注意が必要です、Node.js `v8.9.0` 以上を確認してください！

```bash
npm i -g @vue/cli
```

[CakePHPにVue導入 - 初期導入編](https://webneko.dev/posts/vue-config-and-more)

## UIフレームワーク

[Quasar](https://quasar.dev/)を除いて大体経験あり。

### Bootstrap-Vue

旧バージョンの `bootstrap` との競合や `jQuery` を使わざるを得ない場面が来るかもしれません。

1. `b-form-input` で日本語IMEが効かない
   - [現在は解決](https://github.com/bootstrap-vue/bootstrap-vue/issues/2131)

2. `b-popover` でイベント発火しない
   - `b-dropdown` で代用

3. 思い切って自作

### Tailwind CSS

- [Tailwind CSS v1.0 リリース🎉](https://webneko.dev/posts/major-update-to-tailwindcss-v1)
- [Nuxt Adminに Tailwind CSSを導入](https://webneko.dev/posts/redesigned-nuxt-admin-used-tailwindcss)

## VueとJestを使う

[Jest初心者がこれをやった](https://webneko.dev/posts/vue-jest-tips-and-more)

### Component向けテストを書く

作成中

### Vuex向けテストを書く

作成中
