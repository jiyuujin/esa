/* eslint no-undef: 0 */
module.exports = {
  title: 'ねこのえさ',
  description: 'Web猫のドキュメント集',
  head: [
    [
      'meta',
      { hid: 'description', name: 'description', content: 'Web猫のドキュメント集' },
    ],
    [
      'meta',
      { property: 'og:site_name', content: 'ねこのえさ' },
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://nekohack.app/' },
    ],
    [
      'meta',
      { property: 'og:type', content: 'website' },
    ],
    [
      'meta',
      { property: 'og:title', content: 'ねこのえさ' },
    ],
    [
      'meta',
      { property: 'og:description', content: 'Web猫のドキュメント集' },
    ],
  ],
  base: '/',
  docsDir: 'docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'jiyuujin/esa',
    editLinks: false,
    docsDir: 'docs',
    nav: [
      {
        text: 'ドキュメント',
        link: '/docs/',
      },
      {
        text: '個人スクラム',
        link: '/scrum/',
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
            'infra',
            'devops',
            'guide',
            'community'
          ]
        }
      ],
      '/scrum/': [
        {
          title: '個人スクラム',
          collapsable: false,
          children: [
            '',
            '2019-10-25'
          ]
        }
      ]
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
