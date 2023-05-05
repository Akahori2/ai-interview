import {
  ChatSection,
  Props as ChatSectionProps,
} from '@/components/organisms/ChatSection'
import { PageTemplate } from '@/components/templates/PageTemplate'

export type Props = React.PropsWithChildren<ChatSectionProps>

export const InterviewPageTemplate = (props: Props) => {
  return (
    <PageTemplate>
      <ChatSection
        {...props}
      />
    </PageTemplate>
  )
}
