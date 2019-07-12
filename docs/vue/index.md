# Vue

## Vue CLI

:::warning 今回は v3 を使います！
事前に `@vue/cli` をインストールしておきましょう。

```bash
# @vue/cli
npm i -g @vue/cli
```
:::

プロジェクト作成は、[Vue CLI Installation](https://cli.vuejs.org/guide/installation.html)をご確認ください。

```bash
# Vue CLI
vue create vue-cli-sample
```

### Netlifyにデプロイ

事前に設定ファイル (.toml) を準備します。

```toml
[build]
publish = "docs/.vuepress/dist"
command = "npm run build"
```

容易にデプロイできますね！

```bash
# Build
vuepress build docs
```

#### Netlify Consoleより操作

Github等のアカウントを所有していれば OK [Netlify](https://www.netlify.com/)より、サインアップできます。

<img :src="$withBase('/netlify.png')" alt="netlify">

## Nuxt

Vue CLI同様、 `@vue/cli` をインストールする必要があります。プロジェクト作成は、[Nuxt Installation](https://ja.nuxtjs.org/guide/installation)をご確認ください。

```bash
# Vue CLI
npx create-nuxt-app nuxt-sample
```

### Netlifyにデプロイ

事前に設定ファイル (.toml) を準備します。

```toml
[build]
publish = "dist"
command = "npm run build"
```

容易にデプロイできますね！

```bash
# Build
nuxt build
```

## 書籍

- [Vue.js入門 基礎から実践アプリケーション開発まで](https://www.amazon.co.jp/Vue-js入門-基礎から実践アプリケーション開発まで-川口-和也/dp/4297100916/ref=asc_df_4297100916/?tag=jpgo-22&linkCode=df0&hvadid=295678107984&hvpos=1o2&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-529052961492&psc=1&th=1&psc=1)
- [基礎から学ぶVue.js](https://www.amazon.co.jp/基礎から学ぶ-Vue-js-mio/dp/4863542453/ref=asc_df_4863542453/?tag=jpgo-22&linkCode=df0&hvadid=295706574430&hvpos=1o1&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-524581061219&psc=1&th=1&psc=1)
