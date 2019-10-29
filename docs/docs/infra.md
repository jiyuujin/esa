# インフラ

## Web猫ブログ

[https://webneko.dev/](https://webneko.dev/)

[旧ポータル](https://github.com/jiyuujin/portal)の次期ポータルとしてブログの制作を開始。今となっては v-kansai等コミュニティ運営もその一助として果たしています。

### ブログのコンセプト

1. 自分自身の理解を深める
   - いかに他人に対して説明できるか、という観点を大事にしたい
2. 語彙力を向上する
   - 拙い日本語のままで良い筈がありません
3. 有益なコメント、そしてゆくゆくはバズるかもしれない
   - 間接的に他の人が喜んでくれればそれで良い

### こうやって構築した

- [Web猫ブログのインフラ周りを少々](https://webneko.dev/posts/deploy-webneko-blog-to-fargate-in-ecs)
- [devドメインに移行しました](https://webneko.dev/posts/migrated-to-dev-domain-on-webneko-blog)

## ねこのえさ

[https://nekohack.app/](https://nekohack.app/)

ドキュメントに残すことはもちろん、ブログとは違ってタイムラインによって流されないことを目指しています。

### こうやって構築した

Netlifyを使っています。

```toml
[build]
publish = "docs/.vuepress/dist"
command = "vuepress build"
```

## 管理画面

[https://admin.nekohack.app/](https://admin.nekohack.app/)

技術情報の蓄積や、Web猫ブログで受け付けている問い合わせ等を目的に制作。[ねこのえさ](https://nekohack.app/)のサブドメインの一つとして運営。当初所謂 Atomic Design を採用 (下記のブログ記事を参照)、現在は Service Entityに分ける方法をとっています。

[Atomic Designでの技術選定の結果、そして今後](https://webneko.dev/posts/doing-my-best-to-atomic-design-on-advent-calendar-2018)

### こうやって構築した

Netlifyを使っています。

```toml
[build]
publish = "dist"
command = "nuxt build --spa"
```
