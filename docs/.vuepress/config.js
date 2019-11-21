module.exports = { // eslint no-undef: 0
  title: 'ねこのえさ',
  description: 'Web猫のドキュメント集',
  head: [
    [ 'meta', { hid: 'description', name: 'description', content: 'Web猫のドキュメント集' } ],
    [ 'meta', { property: 'og:site_name', content: 'ねこのえさ' } ],
    [ 'meta', { property: 'og:url', content: '' } ],
    [ 'meta', { property: 'og:type', content: 'website' } ],
    [ 'meta', { property: 'og:title', content: 'ねこのえさ' } ],
    [ 'meta', { property: 'og:description', content: 'Web猫のドキュメント集' } ],
  ],
  base: '/',
  docsDir: 'docs',
  serviceWorker: true,
  themeConfig: {
    locales: {
      '/': {
        repo: 'jiyuujin/esa',
        editLinks: false,
        docsDir: 'docs',
        nav: [
          {
            text: 'ドキュメント',
            link: '/docs/',
          },
          {
            text: 'ブログ',
            link: 'https://webneko.dev/',
          }
        ],
        sidebarDepth: 3,
        sidebar: {
          '/docs/': [
            {
              title: 'ドキュメント',
              collapsable: false,
              children: [
                '',
                'community'
              ]
            }
          ]
        }
      }
    }
  },
  locales: {
    '/': {
      lang: 'jp',
      title: 'ねこのえさ',
      description: 'Web猫のドキュメント集'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'docs/.vuepress/public'
      }
    }
  }
}
