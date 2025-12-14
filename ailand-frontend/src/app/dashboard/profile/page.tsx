import { ContentSection } from '../../../components/content-section'
import { ProfileForm } from './user_profile/profile-form'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc=' '
    >
      <ProfileForm />
    </ContentSection>
  )
}
