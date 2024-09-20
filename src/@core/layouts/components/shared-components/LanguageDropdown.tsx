// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()

  // ** Function to store selected language in localStorage
  const storeSelectedLanguage = (lang: string) => {
    localStorage.setItem('selectedLanguage', lang)
  }

  const handleLangItemClick = (lang: 'en' | 'la') => {
    i18n.changeLanguage(lang)
    storeSelectedLanguage(lang) // Store the selected language in localStorage
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    // Retrieve the selected language from localStorage
    const selectedLanguage = localStorage.getItem('selectedLanguage')

    // If the selected language is found in localStorage, set it as the current language
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage)
      document.documentElement.setAttribute('lang', selectedLanguage)
    } else {
      // If no selected language in localStorage, set the default language
      i18n.changeLanguage('en') // You can change 'en' to your desired default language
      document.documentElement.setAttribute('lang', 'en')
    }
  }, [i18n])

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      icon={<Icon fontSize='1.625rem' icon='tabler:language' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.25, minWidth: 130 } } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          },
          icon: <img src='/images/english.jpg' width={30} alt='English' />
        },
        {
          text: 'Lao',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'la',
            onClick: () => {
              handleLangItemClick('la')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          },
          icon: <img src='/images/lao.png' width={30} alt='Lao' />
        }
      ]}
    />
  )
}

export default LanguageDropdown
