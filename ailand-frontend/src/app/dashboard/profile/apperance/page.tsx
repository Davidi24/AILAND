// import { ContentSection } from '../components/content-section'
// import { AppearanceForm } from './appearance-form'
// import { FontProvider } from '@/context/font-provider'

// function page() {
//   return (
//     <FontProvider>
//       <ContentSection
//         title="Appearance"
//         desc="Customize the appearance of the app. Automatically switch between day and night themes."
//       >
//         <AppearanceForm />
//       </ContentSection>
//     </FontProvider>
//   )
// }

// export default page
import { ContentSection } from '../../../../components/content-section'
import { AppearanceForm } from '../../../../components/ui/forms/appearance-form'
import { FontProvider } from '@/context/font-provider'
import { ThemeProvider } from '@/context/theme-provider'

function page() {
  return (
    <ThemeProvider>
      <FontProvider>
        <ContentSection
          title="Appearance"
          desc="Customize the appearance of the app. Automatically switch between day and night themes."
        >
          <AppearanceForm />
        </ContentSection>
      </FontProvider>
    </ThemeProvider>
  )
}

export default page
