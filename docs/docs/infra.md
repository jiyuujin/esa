# インフラ

## Web猫ブログ

[https://webneko.dev/](https://webneko.dev/)

[旧ポータル](https://github.com/jiyuujin/portal)の次期ポータルサイトとして、ブログの制作を開始しました。今となっては v-kansai等コミュニティ運営もその一助として果たしています。

- [Web猫ブログのインフラ周りを少々](https://webneko.dev/posts/deploy-webneko-blog-to-fargate-in-ecs)
- [devドメインに移行しました](https://webneko.dev/posts/migrated-to-dev-domain-on-webneko-blog)

### ブログのコンセプト

1. 自分自身の理解を深める
   - いかに他人に対して説明できるか、という観点を大事にしたい
2. 語彙力を向上する
   - 拙い日本語のままで良い筈がありません
3. 有益なコメント、そしてゆくゆくはバズるかもしれない
   - 間接的に他の人が喜んでくれればそれで良い

:::tip 趣味用と切り分けました (メンバー限定コンテンツ)
趣味ブログは、ソースコードを [Gitlab](https://gitlab.com/jiyuujin/soranchu-blog-ver2)で管理、[ねこのえさ](https://nekohack.app/)のサブドメインの一つとして、運営しています。

#### Netlifyにデプロイ

事前に設定ファイル (.toml) を準備します。

```toml
[build]
publish = "public"
command = "gatsby build"
```

容易にデプロイできますね！

```bash
# Build
gatsby build
```
:::

### こうやって構築した

#### Dockerイメージを作成

ECSリポジトリに上げる準備をするため、Dockerfileを作ります。

```Dockerfile
FROM node:9.11.1-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --quiet
COPY . .
RUN yarn run build
CMD ["yarn", "run", "start"]
```

やっていることはbuildコマンドを叩いているだけ、然程難しくはありません。このようにDockerfileを準備できたら、実際にビルドを開始します。

```bash
docker build -t <IMAGE_NAME> .
```

#### Tagを付与します

```bash
docker tag <IMAGE_NAME>:latest <ECSリポジトリ>:latest
```

#### ECSリポジトリにPushします

```bash
docker push <ECSリポジトリ>:latest
```

クラスタを作成しますがここでクラスタ名のみならず、コンテナ名やサービス名、タスク名も適当に決定します。

1. ECS 左のメニューから `クラスター` を選択
2. グレーのボタン `今すぐ始める` を選択
3. コンテナの定義では `custom` を選択
4. 右から現れる設定タブで先にPushしたDockerイメージのURIを入力
5. ポートマッピングに `3000` を入力
6. ロードバランサの種類で `Application Load Balancer` を選択

タスク (PublicIP + Port) で実行確認し終えると、ドメインの設定へ続きます。

1. クラスタ一覧から先ほど作成の `クラスタ` を選択
2. サービス名で実行されている `サービス` を選択
3. ロードバランシングからターゲットグループ名の作成されている `ロードバランサ` を選択
4. ターゲットグループに紐づいている `ロードバランサ` を選択
5. このロードバランサのAレコードをRoute53のドメインに追加
6. 下のタブでリスナーを選択
7. リスナーで `HTTP(80)` / `HTTPS(443)` を上記のターゲットグループにリダイレクトする設定を追加
8. ロードバランサに紐づいているセキュリティグループのインバウンドの `HTTP(80)` / `HTTPS(443)` をアクセス可能にする

※ 常時SSL化も忘れずに！

1. ロードバランサのリスナーにて `HTTPS(443)` にACMで取得したSSL証明書を追加
2. リスナーの `HTTP(80)` を `HTTPS(443)` に転送するよう設定

### devドメインに移行しました

今年 2月に解禁となった devドメインをこの度購入。取得経費は ¥1,400 plus tax/年。 devドメイン最大の特徴は HSTS (HTTP Strict Transport Security) 機能、 devドメインへの接続を HTTPSに限定するもので HTTPでアクセスすると強制的に HTTPSにリダイレクトする仕組みとなっているようです。

#### ドメインは Route53で管理

1. Route53でホストゾーンを新規作成
2. Google Domainsでネームサーバを設定
3. Route53で設定したネームサーバを 1個ずつ登録

#### ACMで SSL証明書を発行

1. 証明書のリクエストをクリック
2. パブリック証明書のリクエストを選択
3. ドメイン名 `webneko.dev` を追加
4. 検証方法 DNSを選択
5. 確認画面で確定
6. DNSの検証画面が表示されることを確認
7. 新たに取得された CNAMEを、 Google Domainsで設定
8. 序でに Route53でのレコードも設定しておきます
9. 検証開始をクリック

#### 旧ドメインから新ドメインにリダイレクト

旧ドメイン `webneko.info` から新ドメイン `webneko.dev` にリダイレクトさせるようにします。ちなみに現時点で旧ドメインを削除せず、暫くは共存させる予定で進めることにします。

1. ロードバランサの Aレコードを Route53のドメインに追加
2. S3 Bucketを作成、ファイルは一つも無くて OK
3. エンドポイントをメモ
4. Static website hostingオプションから `このバケットを使用してウェブサイトをホストする` を選択
5. リダイレクトルールを記述
6. CloudFrontで先ほどメモしたエンドポイントを `Origin Domain Name` に設定
7. `Alternate Domain Names (CNAMEs)` に旧ドメインを設定

## ねこのえさ

[https://nekohack.app/](https://nekohack.app/)

ブログと違って、タイムライン等で流されないことを利用したドキュメントを残すようにしました。

### こうやって構築した

#### Netlifyにデプロイ

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

## 管理画面

[https://admin.nekohack.app/](https://admin.nekohack.app/)

技術情報の蓄積や、Web猫ブログで受け付けている問い合わせ等を目的に制作。[ねこのえさ](https://nekohack.app/)のサブドメインの一つとして、運営しています。

### 設計原則

当初は所謂 Atomic Designを採用 (下記のブログ記事を参照)、現在は Service Entityに分ける方法をとっています。

[Atomic Designでの技術選定の結果、そして今後](https://webneko.dev/posts/doing-my-best-to-atomic-design-on-advent-calendar-2018)

#### Firestore

[Firebase Console](https://console.firebase.google.com/)

`contact` コレクションを作ります。

```ts
const adminFirestore: any = Firestore.firestore();

const contactsCollection: any = adminFirestore.collection('contacts')

await contactsCollection.add({
  'time': dayjs().format(),
  'title': this.form.title,
  'category': this.getCategory(),
  'email': this.form.email,
  'description': this.form.description
});
```

その他必要に応じて、コレクションを作ります。

#### Graphcool

[Graphcool Console](https://console.graph.cool/Activity/schema)

`Work` スキーマを作ります。

```graphql
query {
  allWorks(orderBy: startAt_DESC) {
    id
    company
    startAt
    endAt
    title
    description
  }
  # 必要に応じて随時追加
}
```

その他必要に応じて、スキーマを作ります。

### こうやって構築した

#### Netlifyにデプロイ

ねこのえさ同様、容易にデプロイできますね！

```bash
# Build
nuxt build --spa
```
