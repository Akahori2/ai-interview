import { Inter } from 'next/font/google'
import Head from 'next/head'
import { InterviewPageTemplate } from '@/components/templates/PageTemplate/InterviewPageTemplate'
import { ApplicationProvider } from '@/containers/ApplicationProvider'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>AI面接練習</title>
        <meta name='description' content='AIで面接を練習するアプリです' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ApplicationProvider>
        <InterviewPageTemplate />
      </ApplicationProvider>
    </>
  )
}
