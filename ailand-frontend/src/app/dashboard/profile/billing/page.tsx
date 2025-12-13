import { ContentSection } from '../components/content-section'
import BillingForm from './billing-form'  // or correct path

function page() {
  return (
    <ContentSection
      title='Billing'
      desc='Manage your payment methods and invoices.'
    >
      <BillingForm />
    </ContentSection>
  )
}

export default page
