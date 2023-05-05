import { Button as ChakraButton } from '@chakra-ui/react'

export type Props = {
  text: string
  onClick: () => void
}

export const Button = (props: Props) => {
  const { text, onClick } = props
  return <ChakraButton onClick={onClick}>{text}</ChakraButton>
}
