import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Import Volkov and Poppins fonts from google fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Volkhov:wght@700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='bg-primaryBg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
