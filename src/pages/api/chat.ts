import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/dist/api'
import {
  ChatTalkContentsList,
  talker,
} from '@/components/organisms/ChatTalkSection'

const InitialPrompt: string = `議論のロールプレイゲームを行います。目的は、議論を行う能力を向上させることです。議論のルールは下記です。

議論のルール: “””
・あなたはすべての発言を200文字以内で行なってください
・最初にあなたは議論のテーマを一つ決めます。
・議論のテーマについて、あなたはどちらかの立場を取り、宣言します
・議論において、あなたの主張より私の主張の方が論理的に正しいと考えたときは、意見を変えてください。そこで議論は終了です
・議論の結論として、状況次第やバランスが重要という結論には至らないでください。どちらがより正しいかを結論としてください。
・あなたが意見を変えたとき、もしくは私が議論の終了を宣言したとき、議論は終了します。
・議論の終了後、下記の『議論の採点ポイント』の観点で、私があなたの主張をそれぞれ100点満点で厳しく採点し、その点を付けた理由と、今後改善すべき点もそれぞれ必ず記載します。

1.相手の意見を尊重しているか
2.論理的に主張できているか
3.論点が整理できているか
4.オープンマインドを持っているか
5.コミュニケーション能力が高いか
“””`

type RequestChat = {
  inputChatText: string
  chatTalkContentsList: ChatTalkContentsList
}

export type ChatApiRequest = NextApiRequest
export type ChatApiResponse = NextApiResponse<string>

export default async function chat(req: ChatApiRequest, res: ChatApiResponse) {
  try {
    const { inputChatText, chatTalkContentsList } = req.body as RequestChat

    console.log('chat api start')

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    )

    const messages = [
      {
        //最初はSystemから始まる
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: InitialPrompt,
      },
      //今までの会話を送信する
      ...chatTalkContentsList.map((chatTalkContents) => {
        const role =
          chatTalkContents.talker === talker.you
            ? ChatCompletionRequestMessageRoleEnum.User
            : ChatCompletionRequestMessageRoleEnum.Assistant
        return { role, content: chatTalkContents.talkText }
      }),
      {
        //最新の入力を送信する
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: inputChatText,
      },
    ]

    console.log('chat api message:' + JSON.stringify(messages))

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    })

    console.log('chat api response:', response.data)

    const result = response.data.choices[0]
    const message = result.message || {}

    console.log('chat api content:', message)

    res.status(200).send(JSON.stringify(message))
  } catch (e) {
    console.error('chat api error: ' + e)
    res.status(500).send('Internal Server Error')
  }
}
