import '@/styles/globals.css'
import localFont from 'next/font/local'
import type { AppProps } from 'next/app'

const myFont = localFont({
    /**
     * Common weight name mapping
     * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
     */
    src:[
        {
            path: '../styles/font/SpoqaHanSansNeo-Thin.ttf',
            weight: '100',
            style: 'Thin'
        },
        {
            path: '../styles/font/SpoqaHanSansNeo-Light.ttf',
            weight: '300',
            style: 'Light'
        },
        {
            path: '../styles/font/SpoqaHanSansNeo-Regular.ttf',
            weight: '400',
            style: 'Regular'
        },
        {
            path: '../styles/font/SpoqaHanSansNeo-Medium.ttf',
            weight: '500',
            style: 'Medium'
        },
        {
            path: '../styles/font/SpoqaHanSansNeo-Bold.ttf',
            weight: '700',
            style: 'Bold'
        }
    ]
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={myFont.className}>
            <Component {...pageProps} />
        </main>
}