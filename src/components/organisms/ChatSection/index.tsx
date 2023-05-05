import { Flex, chakra } from '@chakra-ui/react'
import { Button } from '@/components/atoms/Button'
import {
  ChatInputSection,
  Props as ChatInputSectionProps,
} from '@/components/organisms/ChatInputSection'
import {
  Props as ChatTextSectionProps,
  ChatTalkSection,
} from '@/components/organisms/ChatTalkSection'

export type Props = ChatTextSectionProps &
  ChatInputSectionProps & {
    addYourChatTalk: () => void
  }

export const ChatSection = (props: Props) => {
  const {
    chatTalkContentsList,
    addYourChatTalk,
    inputChatText,
    setInputChatText,
  } = props
  return (
    <chakra.section>
      <Flex direction={'column'}>
        <Flex>
          <ChatTalkSection chatTalkContentsList={chatTalkContentsList} />
        </Flex>
        <Flex justify={'flex-end'}>
          <ChatInputSection
            inputChatText={inputChatText}
            setInputChatText={setInputChatText}
          />
          <Button text={'送信'} onClick={() => addYourChatTalk()} />
        </Flex>
      </Flex>
    </chakra.section>
  )
}
