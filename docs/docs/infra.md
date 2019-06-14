# インフラ

## Web猫ブログ

- [Web猫ブログのインフラ周りを少々](https://webneko.dev/posts/deploy-webneko-blog-to-fargate-in-ecs)
- [devドメインに移行しました](https://webneko.dev/posts/migrated-to-dev-domain-on-webneko-blog)

### Dockerイメージを作成

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

### Tagを付与します

```bash
docker tag <IMAGE_NAME>:latest <ECSリポジトリ>:latest
```

### ECSリポジトリにPushします

```bash
docker push <ECSリポジトリ>:latest
```

### Fargateで構築

#### クラスタを作成します

クラスター名のみならずコンテナ名やサービス名、タスク名は適当に決めます。

以下順次設定を終えると、タスク(Public IP + Port)で実行確認します。

1. ECS 左のメニューから `クラスター` を選択
2. グレーのボタン `今すぐ始める` を選択
3. コンテナの定義では `custom` を選択
4. 右から現れる設定タブで先にPushしたDockerイメージのURIを入力
5. ポートマッピングに `3000` を入力
6. ロードバランサの種類で `Application Load Balancer` を選択

#### ドメインを設定します

1. クラスタ一覧から先ほど作成の `クラスタ` を選択
2. サービス名で実行されている `サービス` を選択
3. ロードバランシングからターゲットグループ名の作成されている `ロードバランサ` を選択
4. ターゲットグループに紐づいている `ロードバランサ` を選択
5. このロードバランサのAレコードをRoute53のドメインに追加
6. 下のタブでリスナーを選択
7. リスナーで `HTTP(80)` / `HTTPS(443)` を上記のターゲットグループにリダイレクトする設定を追加
8. ロードバランサに紐づいているセキュリティグループのインバウンドの `HTTP(80)` / `HTTPS(443)` をアクセス可能にする

#### 常時SSL化も忘れずに！

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
