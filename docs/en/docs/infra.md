# Infrastructure

## Webneko Blog

[https://webneko.dev/](https://webneko.dev/)

Create blog as the next of [Old portal](https://github.com/jiyuujin/portal), it is a little helpful of management in v-kansai

### Blog Concepts

1. Understand my own potential abilities
   - Tell you my own potential abilities
2. Variable vocabulary
   - No ugly vocabulary
3. Expect ”BUZZ”
   - Will happy to other people

### HowTo build

- [Web猫ブログのインフラ周りを少々](https://webneko.dev/posts/deploy-webneko-blog-to-fargate-in-ecs)
- [devドメインに移行しました](https://webneko.dev/posts/migrated-to-dev-domain-on-webneko-blog)

## Neko No Esa

[https://nekohack.app/](https://nekohack.app/)

No timeline, but i keep documents day by day.

### HowTo build

Use netlify

```toml
[build]
publish = "docs/.vuepress/dist"
command = "vuepress build"
```

## Admin

[https://admin.nekohack.app/](https://admin.nekohack.app/)

Start as the sub domain of [Neko No Esa](https://nekohack.app/). That's because i wanna confirm some tips, contacts has been coming to webneko blog. Used atomic design, but based on service entity.

[Atomic Designでの技術選定の結果、そして今後](https://webneko.dev/posts/doing-my-best-to-atomic-design-on-advent-calendar-2018)

### HowTo build

Use netlify

```toml
[build]
publish = "dist"
command = "nuxt build --spa"
```
