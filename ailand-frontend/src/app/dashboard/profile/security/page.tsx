import { ContentSection } from '../components/content-section'
import SecurityForm from './security-form'  // adjust path if needed

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
