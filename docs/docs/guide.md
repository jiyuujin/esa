# Guide

## Vue.js

1. [Vueインスタンスを生成する](https://jp.vuejs.org/v2/guide/instance.html)
2. [個別のDOMに突っ込んで描画する](https://webneko.dev/posts/design-vue-components-to-individual-dom)

### Vue CLI

:::tip Vue CLI v4 🎉
具体的な変更内容については [公式ページ](https://cli.vuejs.org/migrating-from-v3/#migrating-from-v3) をご確認いただければと思います。
:::

:::warning Vue CLI v3 のインストール
間違ってもv2をインストールしないよう、注意してください。

これを前提として、 Node.js `v8.9.0` 以上であることを確認してください。

```bash
# @vue/cli
npm i -g @vue/cli
```

これにより、 `vue` コマンドを使えるようになります。
:::

具体的なインストール方法は割愛します。プロジェクト作成は、[Vue CLI Installation](https://cli.vuejs.org/guide/installation.html)をご確認ください。

```bash
# Vue CLI
vue create vue-cli-sample
```

TypeScriptを使う場合は `Manually select features` を選択します。オプションは後からでも追加できるので、とりあえず適当に入れておきましょう。

#### Netlifyにデプロイ

簡単に動作確認する場合Netlifyを使うのがオススメ。

事前に設定ファイル `.toml` を準備します。

```toml
[build]
publish = "dist"
command = "npm run build"
```

容易にデプロイできますね！

```bash
# Build
vue-cli-service build
```

##### Netlify Consoleより操作

Github等のアカウントを所有していれば OK [Netlify](https://www.netlify.com/)より、サインアップできます。

<img :src="$withBase('/netlify.png')" alt="netlify">

#### Gitlab-CIの設定

[Gitlab-CI](https://docs.gitlab.com/ee/ci/) では [Node Image](https://hub.docker.com/_/node/) を前提にして、ステージを Lint / UnitTest / Transpile に分けて対応します。

```yaml
# 一括でイメージを設定するなら
#image: node:latest

stages:
  - ESLint
  - UnitTest
  - Transpile
  - Deploy
```

少しハマったこととして package-lock.json等の `.lock` ファイルを .gitignoreに入れないよう注意します。

##### Lintの設定

TypeScriptを使っているので欠かさず `@typescript-eslint` をインストールします。

```yaml
"ESLint":
  image: node:10 # 個別でイメージを設定するなら
  stage: ESLint
  script:
    - |
      npm install eslint \
      eslint-plugin-vue \
      @typescript-eslint/parser \
      @typescript-eslint/typescript-estree
    - node_modules/eslint/bin/eslint.js .
  cache:
    key: "${CI_PROJECT_ID}_cache_yarn"
    paths:
      - .yarn-cache/
      - node_modules/
```

##### Unitテストの設定

`npm run test:unit` を叩きます。

```yaml
"Unit Test":
  image: node:10 # 個別でイメージを設定するなら
  stage: UnitTest
  dependencies:
    - 'ESLint'
  script:
    - npm install --progress=false
    - npm run test:unit
  cache:
    key: "${CI_PROJECT_ID}_cache_yarn"
    paths:
      - .yarn-cache/
      - node_modules/
```

##### トランスパイル

Webアプリケーションのデプロイは [Vue CLI](https://cli.vuejs.org/guide/installation.html) | [Gitlab-CIへのデプロイ](https://cli.vuejs.org/guide/deployment.html#gitlab-pages) をご確認ください。

```yaml
"Transpile":
  image: node:10 # 個別でイメージを設定するなら
  stage: Transpile
  dependencies:
    - 'Unit Test'
  script:
    - npm ci
    - npm run build
#    - mv public public-vue
#    - mv dist public
    - mkdir output
    - mv dist output/dist
#    - cp -pr output/dist public
  cache:
    key: "${CI_PROJECT_ID}_cache_yarn"
    paths:
      - .yarn-cache/
      - node_modules/
  artifacts:
    paths:
      - output/dist
  only:
    - master
```

`npm run build` を叩くことで `dist` に吐き出さる仕組みです。

##### デプロイ

Netlify Console [Site Settings] で `API ID` を `NETLIFY_SITE_ID` 確認します。

続いて同じく Netlify Console [Oauth] で `NETLIFY_PUBLISH_KEY` を設定します。

<img :src="$withBase('/gitlab-ci-access-token.png')" alt="Gitlab CI - Access Token">

`NETLIFY_SITE_ID` / `NETLIFY_PUBLISH_KEY` を確認できたら、 Gitlab-CI [Settings] で設定します。

<img :src="$withBase('/gitlab-ci-environment-variables.png')" alt="Gitlab CI - Environment Variables">

```yaml
"Deploy":
  image: node:10 # 個別でイメージを設定するなら
  stage: Deploy
  dependencies:
    - 'Transpile'
  before_script:
    - npm i -g netlify-cli
  script:
    - netlify deploy -s $NETLIFY_SITE_ID --auth $NETLIFY_PUBLISH_KEY -p --dir output/dist
  only:
    - master
```

### Nuxt

Vue CLI同様 `@vue/cli` をインストールする必要があります。プロジェクト作成は、[Nuxt Installation](https://ja.nuxtjs.org/guide/installation)をご確認ください。

```bash
# Vue CLI
npx create-nuxt-app nuxt-sample
```

#### Netlifyにデプロイ

簡単に動作確認する場合Netlifyを使うのがオススメ。

事前に設定ファイル `.toml` を準備します。

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

## UIフレームワーク

Quasarを除いて、大体経験あり。

- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
- [Element-UI](https://element.eleme.io/#/en-US)
- [Vuetify](https://vuetifyjs.com/ja/)
- [Vuesax](https://lusaxweb.github.io/vuesax/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Quasar](https://quasar.dev/)

### Bootstrap-Vue

`bootstrap-vue` をインストールします。

```bash
# bootstrap-vue
yarn add bootstrap-vue
```

事前に読み込むことで準備完了。

```ts
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

Scoped CSSを利用して views/Index.vue で読み込みます。

```sass
@import '~bootstrap/scss/bootstrap.scss'
@import '~bootstrap-vue/src/index.scss'
```

:::warning 注意すること
旧バージョンの `bootstrap` との競合や `jQuery` を使わざるを得ない場面が来るかもしれません。

1. `b-form-input` で日本語IMEが効かない
   - [現在は解決](https://github.com/bootstrap-vue/bootstrap-vue/issues/2131)

2. `b-popover` でイベント発火しない
   - `b-dropdown` で代用
:::

### Tailwind CSS

- [Nuxt Adminに Tailwind CSSを導入](https://webneko.dev/posts/redesigned-nuxt-admin-used-tailwindcss)
- [Tailwind CSS v1.0 リリース🎉](https://webneko.dev/posts/major-update-to-tailwindcss-v1)

## VueとJestを使う

並列実行されていること。カバレッジやスナップショットのように、プラグイン不要で内製されていること。 TypeScriptとの親和性も高いなど、テストツールに [Jest](https://jestjs.io/ja/) を採用するメリットは多いです。

```bash
# Jestを TypeScriptで使う
yarn add babel-jest jest ts-jest vue-jest -D
```

前提として以下のように Babelを使います。

```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': ['> 1%', 'last 2 versions']
                }
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import'
    ]
}
```

### jest.config.jsを書く

基本的に特異な設定要らず。

```js
module.exports = {
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
}
```

Vue/TypeScriptそれぞれのトランスパイラを設定します。

```js
module.exports = {
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
          'jest-transform-stub',
        '^.+\\.tsx?$': 'ts-jest'
    },
}
```

テスト対象の Componentを指定する際に起点となるパスを設定します。

```js
module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
}
```

テストを書くための準備はこれにて完了しました。

テストの対象は `src/components` に所属するコンポーネントなど。 Vuexを使う場合は `src/store` に所属するモジュールとなります。一方これらのコンポーネント、モジュールに対するテストを `tests/unit` で書きます。

```
.
├── frontend
│   ├── public
│   │   ├── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── atoms
│   │   ├── store
│   │   ├── types
│   │   ├── App.vue
│   │   ├── main.ts
│   ├── tests
│   │   ├── unit
│   │   │   ├── atoms
```

### Component向けテストを書く

### Vuex向けテストを書く

## 書籍

- [Vue.js入門 基礎から実践アプリケーション開発まで](https://www.amazon.co.jp/Vue-js入門-基礎から実践アプリケーション開発まで-川口-和也/dp/4297100916/ref=asc_df_4297100916/?tag=jpgo-22&linkCode=df0&hvadid=295678107984&hvpos=1o2&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-529052961492&psc=1&th=1&psc=1)
- [基礎から学ぶVue.js](https://www.amazon.co.jp/基礎から学ぶ-Vue-js-mio/dp/4863542453/ref=asc_df_4863542453/?tag=jpgo-22&linkCode=df0&hvadid=295706574430&hvpos=1o1&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-524581061219&psc=1&th=1&psc=1)
- [実践TypeScript ~	BFFとNext.js&Nuxt.jsの型定義~](https://www.amazon.co.jp/%E5%AE%9F%E8%B7%B5TypeScript-BFF%E3%81%A8Next-js-Nuxt-js%E3%81%AE%E5%9E%8B%E5%AE%9A%E7%BE%A9-%E5%90%89%E4%BA%95-%E5%81%A5%E6%96%87/dp/483996937X)
