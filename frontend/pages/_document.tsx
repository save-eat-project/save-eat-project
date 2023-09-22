import { Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/static/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/static/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/static/favicon-64x64.png" sizes="64x64" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}