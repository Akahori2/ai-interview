import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ChatCompletionResponseMessage } from 'openai'
import { useState } from 'react'
import {
  ChatTalkContentsList,
  talker,
} from '@/components/organisms/ChatTalkSection'
import { InterviewPageTemplate } from '@/components/templates/PageTemplate/InterviewPageTemplate'
import { ApplicationProvider } from '@/containers/ApplicationProvider'
import { HTTPService } from '@/services/HTTPService'

const inter = Inter({ subsets: ['latin'] })
export type ChatTalkNo = {
  talkNo: number
}

export default function Home() {
  //入力中テキスト
  const [inputChatText, setInputChatText] = useState<string>('')
  //確定済みチャット
  const [chatTalkContentsList, setChatTalkContentsList] =
    useState<ChatTalkContentsList>([])

  const addYourChatTalk = async () => {
    setChatTalkContentsList((chatTalkContentsList) => [
      ...chatTalkContentsList,
      {
        talker: talker.you,
        totalTalkNo: chatTalkContentsList.length + 1,
        talkText: inputChatText,
      },
    ])
    addAIChatTalk()
  }

  const addAIChatTalk = async () => {
    console.log('addAIChatTalk start')
    try {
      const response =
        await HTTPService.getInstance().post<ChatCompletionResponseMessage>({
          url: '/api/chat',
          body: {inputChatText, chatTalkContentsList},
        })

      console.log('addAIChatTalk response:', JSON.stringify(response))

      setChatTalkContentsList((chatTalkContentsList) => [
        ...chatTalkContentsList,
        {
          talker: talker.ai,
          totalTalkNo: chatTalkContentsList.length + 1,
          talkText: response?.content || '',
        },
      ])
    } catch (e) {
      console.error('error:' + e)
    }
  }

  return (
    <>
      <Head>
        <title>AIディスカッション</title>
        <meta
          name='description'
          content='AIでディスカッションを練習するアプリです'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ApplicationProvider>
        <InterviewPageTemplate
          chatTalkContentsList={chatTalkContentsList}
          addYourChatTalk={addYourChatTalk}
          inputChatText={inputChatText}
          setInputChatText={setInputChatText}
        />
      </ApplicationProvider>
    </>
  )
}
