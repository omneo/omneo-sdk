import { Omneo } from '../../..'
import { DelegationData, Profile } from '../../../types'

async function createProfileByDelegation (client: Omneo, body: any, delegation: DelegationData, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile> {
  const { type, url, enabled } = delegation
  if (!enabled) return Promise.reject(new Error('Delegation not enabled'))

  const tokenData = await client.call({
    method: 'post',
    endpoint: '/auth/delegate',
    body: { client_handle: type }
  }).then((response) => response?.data?.token)

  if (!tokenData) {
    return Promise.reject(new Error(`Failed to get token for delegate type ${type}`))
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenData}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => response.json())
    .catch(async (error) => {
      if (error?.response?.status !== 422 || !error?.response?.data?.errors?.mobile_phone) {
        return Promise.reject(error)
      }
      if (!options.retryMobileSecondary) return

      const payload = { ...body }
      payload.secondary_phone = payload.mobile_phone
      delete payload.mobile_phone
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${client.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      return data.data
    })
}
export default createProfileByDelegation
