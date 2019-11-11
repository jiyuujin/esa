# Guide

[フロント・サーバ構築手順書](https://webneko.dev/posts/the-development-guide-for-fullstack-engineers)

## Vue.js

- [Vueインスタンスを生成する](https://jp.vuejs.org/v2/guide/instance.html)
- [個別のDOMに突っ込んで描画する](https://webneko.dev/posts/design-vue-components-to-individual-dom)

### Vue CLI

Pay attention to legacy development, confirm to Node.js `v8.9.0`

```bash
npm i -g @vue/cli
```

[CakePHPにVue導入 - 初期導入編](https://webneko.dev/posts/vue-config-and-more)

## UI framework

i has used CSS frameworks exclude [Quasar](https://quasar.dev/)

### Bootstrap-Vue

Conflict to old `bootstrap` , you must use `jQuery`

1. No `b-form-input`
   - [Solved Currently](https://github.com/bootstrap-vue/bootstrap-vue/issues/2131)

2. Noe events in `b-popover`
   - Replace for `b-dropdown`

3. i create my own packages

### Tailwind CSS

- [Tailwind CSS v1.0 リリース🎉](https://webneko.dev/posts/major-update-to-tailwindcss-v1)
- [Nuxt Adminに Tailwind CSSを導入](https://webneko.dev/posts/redesigned-nuxt-admin-used-tailwindcss)

## Use Vue & Jest

[Jest初心者がこれをやった](https://webneko.dev/posts/vue-jest-tips-and-more)

### Test for components

As soon as decided

### Test for vuex

As soon as decided
