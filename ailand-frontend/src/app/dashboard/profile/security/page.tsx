import { ContentSection } from '../../../../components/content-section'
import SecurityForm from '../../../../components/ui/forms/security-form'  // adjust path if needed

function page() {
  return (
    <ContentSection
      title='Security'
      desc='Manage your password, authentication and active sessions.'
    >
      <SecurityForm />
    </ContentSection>
  )
}

export default page
