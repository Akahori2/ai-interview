import { chakra, Input } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

export type Props = {
  inputChatText: string
  setInputChatText: Dispatch<SetStateAction<string>>
}

export const ChatInputSection = (props: Props) => {
  const { inputChatText, setInputChatText } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputChatText(e.target.value)
  return (
    <chakra.div>
      <Input placeholder='入力してください' value={inputChatText} onChange={handleChange} />
    </chakra.div>
  )
}
