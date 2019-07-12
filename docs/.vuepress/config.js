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
        text: 'Vue',
        link: '/vue/',
      },
    ],
    // sidebarDepth: 3,
    sidebar: {
      '/docs/': [
        {
          title: 'ドキュメント',
          collapsable: false,
          children: [
            '',
            'infra',
            'devops',
            'community'
          ]
        }
      ],
      '/vue/': [
        {
          title: 'Vue',
          collapsable: false,
          children: [
            ''
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
};
