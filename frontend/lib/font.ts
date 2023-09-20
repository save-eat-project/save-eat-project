import localFont from 'next/font/local'

export const SpoqaHanSansNeoFont = localFont({
  /*
    Common weight name mapping
    https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
  */
  src: [
    {
      path: '../assets/font/SpoqaHanSansNeo-Thin.woff',
      weight: '100',
      style: 'Thin',
    },
    {
      path: '../assets/font/SpoqaHanSansNeo-Light.woff',
      weight: '300',
      style: 'Light'
    },
    {
      path: '../assets/font/SpoqaHanSansNeo-Regular.woff',
      weight: '400',
      style: 'Regular'
    },
    {
      path: '../assets/font/SpoqaHanSansNeo-Medium.woff',
      weight: '500',
      style: 'Medium'
    },
    {
      path: '../assets/font/SpoqaHanSansNeo-Bold.woff',
      weight: '700',
      style: 'Bold'
    }
  ],

})
