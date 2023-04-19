import { ChakraProvider } from '@chakra-ui/react'

export type Props = React.PropsWithChildren<{}>

export const ApplicationProvider = (props: Props) => {
  const { children } = props

  return <ChakraProvider>{children}</ChakraProvider>
}
