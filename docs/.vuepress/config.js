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
    locales: {
      '/': {
        repo: 'jiyuujin/esa',
        editLinks: false,
        docsDir: 'docs',
        nav: [
          {
            text: 'Document',
            link: '/docs/',
          },
          {
            text: 'Scrum',
            link: '/scrum/',
          },
          {
            text: 'Webneko Blog',
            link: 'https://webneko.dev/',
          }
        ],
        sidebarDepth: 3,
        sidebar: {
          '/docs/': [
            {
              title: 'Document',
              collapsable: false,
              children: [
                '',
                'infra',
                'guide',
                'community'
              ]
            }
          ],
          '/scrum/': [
            {
              title: 'Scrum',
              collapsable: false,
              children: [
                '',
                '2019-10-25'
              ]
            }
          ]
        }
      },
      '/jp/': {
        repo: 'jiyuujin/esa',
        editLinks: false,
        docsDir: 'docs',
        nav: [
          {
            text: 'ドキュメント',
            link: '/jp/docs/',
          },
          {
            text: 'スクラム',
            link: '/jp/scrum/',
          },
          {
            text: 'Web猫ブログ',
            link: 'https://webneko.dev/',
          }
        ],
        sidebarDepth: 3,
        sidebar: {
          '/jp/docs/': [
            {
              title: 'ドキュメント',
              collapsable: false,
              children: [
                '',
                'infra',
                'guide',
                'community'
              ]
            }
          ],
          '/jp/scrum/': [
            {
              title: 'スクラム',
              collapsable: false,
              children: [
                '',
                '2019-10-25'
              ]
            }
          ]
        }
      }
    }
  },
  locales: {
    '/': {
      lang: 'en',
      title: 'Neko No Esa',
      description: 'Documents of Webneko'
    },
    '/jp/': {
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
