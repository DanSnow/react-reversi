// app/routes/__root.tsx
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { Provider as AtomProvider } from 'jotai'
import * as React from 'react'
import { store as atomStore } from '~/atoms/store'
import styleUrl from '~/styles/main.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: 'stylesheet',
        href: styleUrl,
      },
      {
        rel: 'shortcut icon',
        type: 'image/png',
        href: 'https://dansnow.github.io/react-reversi/thumbnail.png',
      },
    ],
    meta: [
      {
        httpEquiv: 'Content-Type',
        content: 'text/html; charset=utf-8',
      },
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        property: 'og:url',
        content: 'https://dansnow.github.io/react-reversi/',
      },
      {
        property: 'og:title',
        content: 'Reversi',
      },
      {
        property: 'og:description',
        content: 'Reversi made by React.js',
      },
      {
        property: 'og:image',
        content: 'https://dansnow.github.io/react-reversi/thumbnail.png',
      },
      {
        property: 'og:image:width',
        content: '200',
      },
      {
        property: 'og:image:height',
        content: '200',
      },
      {
        title: 'Reversi',
      },
    ],
    scripts: [
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-91635441-2',
      },
      {
        dangerouslySetInnerHTML: {
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-91635441-2');
        `,
        },
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <AtomProvider store={atomStore}>
        <Outlet />
        <div className="confirm-root" />
        <div className="dialog-root" />
      </AtomProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
