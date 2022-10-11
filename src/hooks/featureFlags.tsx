import { AppConfigurationClient } from '@azure/app-configuration'
import { useState, useMemo } from 'react'

const isNullOrWhiteSpace = (input: string) =>
  !input || !input.toString().trim().length

const useFeatureFlag = (key = '') => {
  const [enabled, setEnabled] = useState(false)

  useMemo(async () => {
    if (isNullOrWhiteSpace(key)) {
      console.error('A feature flag key must be supplied')
      return
    }

    try {
      const response = await await (
        await fetch(`${window.APP_CONFIG.apiUrl}/feature?flag=${key}`)
      ).json()

      setEnabled(response)
    } catch (err) {
      setEnabled(false)
    }
  }, [key])

  return { enabled }
}

export { useFeatureFlag }
