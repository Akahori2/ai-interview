import { Flex, chakra } from '@chakra-ui/react'
import { Footer } from '@/components/organisms/Footer'
import { Header } from '@/components/organisms/Header'

export type Props = React.PropsWithChildren<{}>

export const PageTemplate = (props: Props) => {
  const { children } = props
  return (
    <Flex flexDirection={'column'} width={'100vw'} height={'100vh'}>
      <Header />
      <Flex flex={'1'}>{children}</Flex>
      <Footer />
    </Flex>
  )
}
