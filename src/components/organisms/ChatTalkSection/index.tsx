import { Stack, StackDivider, Text, VStack, chakra } from '@chakra-ui/react'

export const talker = { you: 'you', ai: 'ai' } as const
export type Talker = (typeof talker)[keyof typeof talker]

export type ChatTalkContents = {
  talker: Talker
  totalTalkNo: number
  talkText: string
}

export type ChatTalkContentsList = ChatTalkContents[]

export type Props = {
  chatTalkContentsList: ChatTalkContentsList
}

export const ChatTalkSection = (props: Props) => {
  const { chatTalkContentsList } = props
  return (
    <VStack
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      width={'100vw'}
    >
      {chatTalkContentsList.map((chatTalkContents) => {
        const nameLabel = chatTalkContents.talker === talker.you ? 'You' : 'AI'
        const talkKey = chatTalkContents.totalTalkNo

        return (
          <chakra.div key={talkKey}>
            <chakra.span>{nameLabel}:</chakra.span>
            <Text fontSize='lg'>{chatTalkContents.talkText}</Text>
          </chakra.div>
        )
      })}
    </VStack>
  )
}
