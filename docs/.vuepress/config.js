// eslint-disable-next-line no-undef
module.exports = {
  title: 'ねこのえさ',
  description: 'Web猫のドキュメント',
  head: [
    [ 'meta', { hid: 'description', name: 'description', content: 'Web猫のドキュメント' } ],
    [ 'meta', { property: 'og:site_name', content: 'ねこのえさ' } ],
    [ 'meta', { property: 'og:url', content: '' } ],
    [ 'meta', { property: 'og:type', content: 'website' } ],
    [ 'meta', { property: 'og:title', content: 'ねこのえさ' } ],
    [ 'meta', { property: 'og:description', content: 'Web猫のドキュメント' } ],
  ],
  base: '/',
  docsDir: 'docs',
  serviceWorker: true,
  themeConfig: {
    locales: {
      '/': {
        repo: 'nekohack/esa',
        editLinks: false,
        docsDir: 'docs',
        nav: [
          {
            text: 'Profile',
            link: 'https://yuukit.me/',
          },
          {
            text: 'Blog',
            link: 'https://webneko.dev/',
          }
        ],
        sidebarDepth: 3,
        sidebar: {
          '/': [
            {
              title: 'All',
              collapsable: false,
              children: [
                '/',
                '/community/'
              ]
            }
          ],
          '/community/': [
            {
              title: 'コミュニティ',
              collapsable: false,
              children: [
                '/'
              ]
            }
          ]
        }
      },
      '/jp/': {
        repo: 'nekohack/esa',
        editLinks: false,
        docsDir: 'docs',
        nav: [
          {
            text: 'プロフィール',
            link: 'https://yuukit.me/',
          },
          {
            text: 'ブログ',
            link: 'https://webneko.dev/',
          }
        ],
        sidebarDepth: 3,
        sidebar: {
          '/': [
            {
              title: '概要',
              collapsable: false,
              children: [
                '/jp/',
                '/jp/community/'
              ]
            }
          ],
          '/community/': [
            {
              title: 'コミュニティ',
              collapsable: false,
              children: [
                '/jp/'
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
      title: 'esa',
      description: 'Document cat'
    },
    '/jp/': {
      lang: 'jp',
      title: 'ねこのえさ',
      description: 'Web猫のドキュメント'
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
