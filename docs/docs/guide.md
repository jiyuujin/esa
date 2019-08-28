# Guide

## Vue CLI

:::warning vue-cli@v3 をインストールします。
今回 webpack4ベースの vue-cli@v3を使っています。

間違っても `v2` をインストールしないよう、注意してください。

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

### Netlifyにデプロイ

簡単に動作確認する場合、Netlifyを使うのがオススメ。

事前に設定ファイル (.toml) を準備します。

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

#### Netlify Consoleより操作

Github等のアカウントを所有していれば OK [Netlify](https://www.netlify.com/)より、サインアップできます。

<img :src="$withBase('/netlify.png')" alt="netlify">

### Gitlab-CIを回す

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

#### Lintを設定する

TypeScriptを使っているので、欠かさず `@typescript-eslint` をインストール、チェックを進めます。

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

#### Unitテストを設定する

`npm run test:unit` を叩くよう設定します。

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

#### トランスパイルする

Webアプリケーションのデプロイは [vue-cli@v3](https://cli.vuejs.org/guide/installation.html) | [Gitlab-CIへのデプロイ](https://cli.vuejs.org/guide/deployment.html#gitlab-pages) をご確認ください。

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

#### デプロイ

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

### vue.config.jsの色々

::: tip ブログにも書いています
[vue.config.jsの色々](https://webneko.dev/posts/vue-config-and-more)
:::

ルートディレクトリに今回の主役である vue.config.js を置きます。

```js
module.exports = {
    // 必要に応じて追加します
}
```

今回 vue-cli@v3 をルートディレクトリでは無い場所で作業を進めるので、エントリーポイントや出力先などを設定する必要があります。

```js
pages: {
    index: {
        entry: './frontend/src/main.ts',
        template: './frontend/public/index.html',
        filename: 'index.html',
        chunks: [
            'chunk-vendors',
            'chunk-common',
            'index'
        ]
    }
}
```

とある別のコンポーネントをインポートする際に起点となるパスを設定します。

```js
configureWebpack: {
    resolve: {
        alias: {
            // 起点となるパスを設定します
            '@': path.join(__dirname, 'frontend/src/')
        }
    }
}
```

ビルド後に生成されるトランスパイル済ファイルは CakePHP側からレンダリングされるよう、今回は `webroot/dist` ディレクトリ下に置くと良さそうです。

またこのままだとハッシュ値が付いた状態でトランスパイルされますが、ハッシュ値を付けない設定も可能です。

```js
chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        // メインJSファイル名にハッシュ値を付けない
        config.output
            .filename('[name].js')
        // chunk-vendorsファイル名にハッシュ値を付けない
        config.output
            .chunkFilename('js/[name].js')
    }
}
```

基本的にプロジェクト次第ですが、ハッシュ値を付けない方が都合が良くなる場面があるかもしれません。

#### ルーティングを指定する

順当に [vue-router](https://router.vuejs.org/ja/installation.html) を使うことにした訳ですが、サーバサイドでルーティングを既に作っていたこと。そのためこれに合わせて frontend/main.ts 内でルーティングリストを準備しています。

#### 最後に、

このルーティングを以って初めて CakePHP に Vue を導入することができました。

```html
<div id="app">
    <router-view/>
</div>
```

上記を .tpl に設定することで、無事にレンダリングされることを確認しましょう😋

### Vueの描画方法

::: tip ブログにも書いています
[マウントせずに、Vueを描画する方法](https://webneko.dev/posts/designed-without-mount-components)
:::

描画方法は主に、

1. Vueインスタンスを生成する
2. ドキュメント外 (main.js) で個別のDOMに突っ込んで描画する

前者がごく一般的な方法かと思います。 Vue CLI を採用すると以下のように main.js で Vueインスタンスを生成します。前提として vue-router を使ってルーティングリストを準備しましょう。

```js
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

#### ドキュメント外 (main.js) で個別のDOMに突っ込んで描画する

コンポーネントごと DOMを準備すること。画面描画と違い、部分描画を目指しています。

```js
import HelloWorld from '@/components/HelloWorld.vue'

const HelloWorldClass = Vue.extend(HelloWorld)

const HelloWorldInstance = new HelloWorldClass().$mount()

document.getElementById('hello-world').appendChild(HelloWorldInstance.$el)
```

実際にアプリケーションに組み込む場合、極力外部に切り出しておきましょう。

```ts
export const AppendComponent = (
    component: VueConstructor,
    id: string
) => {
    const ComponentClass = Vue.extend(component)
    const ComponentInstance = new ComponentClass().$mount()
    if (document.getElementById(id) != null) {
        document.getElementById(id).appendChild(ComponentInstance.$el)
    }
}
```

#### wrapperとして吐き出す方法

`target` オプションに `wc` を付けてビルドすること。

```bash
# Bundle Build
cross-env VUE_CLI_CSS_SHADOW_MODE=true vue-cli-service build --target wc --name custom-element ./front/src/main.js
```

 Componentごと DOMを準備することで、テンプレートファイル (.blade.php/.tpl) などに、吐き出した Vue Componentを設定して使います。

```ts
import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'

const HelloWorldElement = wrap(Vue, () => import(`./components/HelloWorld.vue`))
const LineChartElement = wrap(Vue, () => import(`./components/chart/LineChart.vue`))

window.customElements.define('hello-world', HelloWorldElement)
window.customElements.define('line-chart', LineChartElement)
```

## Nuxt

Vue CLI同様、 `@vue/cli` をインストールする必要があります。プロジェクト作成は、[Nuxt Installation](https://ja.nuxtjs.org/guide/installation)をご確認ください。

```bash
# Vue CLI
npx create-nuxt-app nuxt-sample
```

### Netlifyにデプロイ

簡単に動作確認する場合、Netlifyを使うのがオススメ。

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

## UIフレームワーク

- [Bootstrap-Vue](https://bootstrap-vue.js.org/)
- [Element-UI](https://element.eleme.io/#/en-US)
- [Vuetify](https://vuetifyjs.com/ja/)
- [Vuesax](https://lusaxweb.github.io/vuesax/)
- [Quasar](https://quasar.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### bootstrap-vue

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

## Unitテスト

### Jestを使う

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

#### jest.config.jsを書く

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

スナップショットをとる場合は以下の通りです。

```js
module.exports = {
    snapshotSerializers: ['jest-serializer-vue'],
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

#### Component向けテストを書く

#### Vuex向けテストを書く

## Packages一覧

### vue-router

詳しくは [vue-router](https://router.vuejs.org/ja/installation.html) をご確認ください。ただし [Nuxt](https://ja.nuxtjs.org/) では既に入っています。

```bash
# vue-router
yarn add vue-router
```

ちなみに一々、ルーティングを書かなくても自動化してくれる [vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing) もありますが、この場では割愛します。

サーバサイドで準備しているルーティングに合わせてルーティングリストを作成します。また動的ルーティングは、 `:id` 等のように `path` の後ろに設定すると良いです。

```ts
import HelloWorld from './components/HelloWorld.vue'
import ProductEdit from './components/product/Edit.vue'

const routes = [
    { path: '/hq_products/test', component: HelloWorld },
    { path: '/hq_products/edit/:id', component: ProductEdit },
];
```

### vue-i18n

基本的に Vue CLI では `add` するだけで良い

```bash
# vue-i18n
vue add i18n
```

と言えば済む話ですが、簡単に解説を😀

事前に `i18n` ディレクトリ下に `.json` を設定、個別の `key` にアクセスすることで多言語対応を実現することができます。

#### pluginsを見よう

plugins/i18n.tsを作ります。

デフォルトの言語だけではなく、仮に `key` が存在しなかった場合の言語も設定します。

```ts
import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'ja',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
})
```

### vue-chartjs

前提として [vue-cli@v3](https://cli.vuejs.org/) で進めますが、 [nuxt](https://ja.nuxtjs.org/) でも基本的に変わりませんので、広く見ていただければ。🙏

```bash
# 型定義を含めインストール
yarn add vue-chartjs chart.js @types/chart.js
```

適宜 tsconfig.json の `compilerOptions` に追加します。

```json
{
  "compilerOptions": {
    "types": [
      "@types/chart.js"
    ]
  }
}
```

基本的に下準備はこれだけ。

#### Componentでこうやって使う

詳しくは以下リンクをご確認いただければ、と思います。

<a class="link-preview" href="https://vue-chartjs.org/guide/#example">vue-chartjsを使ったサンプルなど</a>

基本的には `datasets` と `options` を渡してあげることで描画してくれる仕組みです。

```ts
import Vue from 'vue'
import ChartData from 'chart.js'
import { HorizontalBar } from 'vue-chartjs'

const chartData: ChartData.ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#42b883',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
    ]
}

const chartOptions: ChartData.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
}

export default Vue.extend({
    extends: HorizontalBar,
    mounted () {
        this.renderChart(chartData, chartOptions)
    }
})
```

## 書籍

- [Vue.js入門 基礎から実践アプリケーション開発まで](https://www.amazon.co.jp/Vue-js入門-基礎から実践アプリケーション開発まで-川口-和也/dp/4297100916/ref=asc_df_4297100916/?tag=jpgo-22&linkCode=df0&hvadid=295678107984&hvpos=1o2&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-529052961492&psc=1&th=1&psc=1)
- [基礎から学ぶVue.js](https://www.amazon.co.jp/基礎から学ぶ-Vue-js-mio/dp/4863542453/ref=asc_df_4863542453/?tag=jpgo-22&linkCode=df0&hvadid=295706574430&hvpos=1o1&hvnetw=g&hvrand=14768796437105570206&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1009540&hvtargid=pla-524581061219&psc=1&th=1&psc=1)
- [実践TypeScript ~	BFFとNext.js&Nuxt.jsの型定義~](https://www.amazon.co.jp/%E5%AE%9F%E8%B7%B5TypeScript-BFF%E3%81%A8Next-js-Nuxt-js%E3%81%AE%E5%9E%8B%E5%AE%9A%E7%BE%A9-%E5%90%89%E4%BA%95-%E5%81%A5%E6%96%87/dp/483996937X)
