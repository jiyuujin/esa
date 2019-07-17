# Vue

## Vue CLI

:::warning vue-cli@v3 をインストールします。
間違っても `v2` をインストールしないよう、注意してください。

前提として、 Node.js `v8.9.0` 以上であることを確認してください。

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

今回 TypeScriptを使うので `Manually select features` を選択します。オプションは後からでも追加できるので、とりあえず適当に入れておきましょう。

インストール完了後、以下のように展開されるはずです。

```
.
├── .browserslistrc
├── .dockerignore
├── .editorconfig
├── .eslintrc.js
├── .git
├── .gitignore
├── .idea
├── README.md
├── babel.config.js
├── docker-compose.yml
├── docker-compose.yml.example
├── frontend
├── jest.config.js
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── tsconfig.json
└── vue.config.js
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
vue-cli-service build
```

#### Netlify Consoleより操作

Github等のアカウントを所有していれば OK [Netlify](https://www.netlify.com/)より、サインアップできます。

<img :src="$withBase('/netlify.png')" alt="netlify">

### vue.config.jsの色々

ルートディレクトリに今回の主役である vue.config.js を置きます。

```js
module.exports = {
    // 必要に応じて追加します
}
```

#### フロントエンドの作業場所を指定する

先に vue-cli@v3 を展開した `front` 下で作業を進めます。

```js
publicPath: '/',
outputDir: 'webroot/dist/',
pages: {
    index: {
        entry: './front/src/main.js',
        template: './front/public/index.html',
        filename: 'index.html',
        chunks: [
            'chunk-vendors',
            'chunk-common',
            'index'
        ]
    }
}
```

ビルド後に生成されるトランスパイル済ファイルは `outputDir` で指定した先に置くことになっていますが、 Laravelをサーバサイドに扱っている場合 public下に置くと良さそうです。

またこのままだとファイル名にハッシュ値が付いた状態でトランスパイルされますが、ハッシュ値を付けない設定も可能です。

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

#### あったら嬉しい！

とある別の Componentをインポートする際の、起点となるパスを設定しましょう。

```js
configureWebpack: {
    resolve: {
        alias: {
            // 起点となるパスを設定します
            '@': path.join(__dirname, 'front/src/')
        }
    }
}
```

すると以下のように実現できるのでオススメ。

```js
import Vue from 'vue'

// 動的インポートを実現したい
const HelloWorld = () => import(`@/components/HelloWorld.vue`)

export default Vue.extend({
    components: {
        HelloWorld
    }
})
```

### Vueの描画方法

[マウントせずに、Vueを描画する方法](https://webneko.dev/posts/designed-without-mount-components)

描画方法は主に、

1. Vueインスタンスを生成する
2. ドキュメント外 (main.js) で個別のDOMに突っ込んで描画する

前者がごく一般的な方法かと思います。 [vue-cli](https://cli.vuejs.org/) を採用すると以下のように main.jsで Vueインスタンスを生成します。前提として vue-router を使ってルーティングリストを準備しましょう。

```js
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

一方で後者の前提は Componentごと DOMを準備すること。画面描画と違い、部分描画を目指しています。

```js
import HelloWorld from '@/components/HelloWorld.vue'

const HelloWorldClass = Vue.extend(HelloWorld)

const HelloWorldInstance = new HelloWorldClass().$mount()

document.getElementById('hello-world').appendChild(HelloWorldInstance.$el)
```

初めて知った内容ですが、テンプレートファイル (.blade.php/.tpl) などに、吐き出した Vue Componentを設定して使います。詳しくは以下 [vm-mount](https://jp.vuejs.org/v2/api/#vm-mount) をご参照ください。

#### 共通処理として、

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

### wrapperとして吐き出す方法

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

## Packages

### vue-chartjs

前提として [vue-cli@v3](https://cli.vuejs.org/) で進めます。とはいえ、 [nuxt](https://ja.nuxtjs.org/) でも基本的に変わりませんので、広く見ていただければ。🙏

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
