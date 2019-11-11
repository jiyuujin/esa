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
            text: 'ドキュメント',
            link: '/docs/',
          },
          {
            text: 'スクラム',
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
                'guide',
                'community'
              ]
            }
          ],
          '/scrum/': [
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
      },
      // '/en/': {
      //   repo: 'jiyuujin/esa',
      //   editLinks: false,
      //   docsDir: 'docs',
      //   nav: [
      //     {
      //       text: 'Docs',
      //       link: '/en/docs/',
      //     },
      //     {
      //       text: 'Scrum',
      //       link: '/en/scrum/',
      //     },
      //     {
      //       text: 'Blog',
      //       link: 'https://webneko.dev/',
      //     }
      //   ],
      //   sidebarDepth: 3,
      //   sidebar: {
      //     '/en/docs/': [
      //       {
      //         title: 'Docs',
      //         collapsable: false,
      //         children: [
      //           '',
      //           'infra',
      //           'guide',
      //           'community'
      //         ]
      //       }
      //     ],
      //     '/en/scrum/': [
      //       {
      //         title: 'Scrum',
      //         collapsable: false,
      //         children: [
      //           '',
      //           '2019-10-25'
      //         ]
      //       }
      //     ]
      //   }
      // }
    }
  },
  locales: {
    '/': {
      lang: 'jp',
      title: 'ねこのえさ',
      description: 'Web猫のドキュメント集'
    }
    // '/en/': {
    //   lang: 'en',
    //   title: 'neko no esa',
    //   description: 'Documents of WebNeko'
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'docs/.vuepress/public'
      }
    }
  }
}
