import { AppConfigurationClient } from '@azure/app-configuration'
import { useState, useMemo } from 'react'

// READ ONLY CONNECTION STRING
const client = new AppConfigurationClient(
  'Endpoint=https://spotify-app-configurator.azconfig.io;Id=1ve2-lo-s0:ZvT8nSOVLwdzr9wtVnx/;Secret=kzUFp/5MlXd3iOFn36D6gGAH9BFNJZA7uBPjGmnQgY4='
)

const isNullOrWhiteSpace = (input: string) =>
  !input || !input.toString().trim().length

const useAzureFeatureFlag = (key = '') => {
  const [enabled, setEnabled] = useState(false)

  useMemo(async () => {
    if (isNullOrWhiteSpace(key)) {
      console.error('A feature flag key must be supplied')
      return
    }
    try {
      const result = await client.getConfigurationSetting({
        key: `.appconfig.featureflag/${key.toString().trim()}`,
      })

      if (result?.value) {
        const isFeatureEnabled = JSON.parse(result.value).enabled
        console.log({ isFeatureEnabled })
        setEnabled(isFeatureEnabled)
      } else {
        console.log('feature no available')
        setEnabled(false)
      }
    } catch (err) {
      console.log(err)
      setEnabled(false)
    }
  }, [key])

  return enabled
}

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

export { useFeatureFlag, useAzureFeatureFlag }
