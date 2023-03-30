import { Omneo } from '..'
import { Profile } from '../types'

async function createProfile (this: Omneo, body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile> {
  return this.call({
    method: 'post',
    endpoint: '/profiles',
    body
  }).then((response) => {
    return response.data
  }).catch(async (error) => {
    if (error?.response?.status !== 422 || !error?.response?.data?.errors?.mobile_phone) {
      return Promise.reject(error)
    }
    if (!options.retryMobileSecondary) return

    const payload = { ...body }
    payload.secondary_phone = payload.mobile_phone
    delete payload.mobile_phone
    return this.call({
      method: 'post',
      endpoint: '/profiles',
      body: payload
    }).then((response) => {
      return response.data
    })
  })
}
export default createProfile
