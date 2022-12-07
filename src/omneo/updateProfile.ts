import { Omneo } from '..'
import { Profile } from '../types'

async function updateProfile (this: Omneo, id: string, body: any, options: { retryMobileSecondary?: Boolean } = {}): Promise<Profile> {
  return this.call({
    method: 'put',
    endpoint: `/profiles/${id}`,
    body
  }).then((response) => {
    return response.data
  }).catch(async (error) => {
    if (error?.status !== 422 || !error?.body?.errors?.mobile_phone) {
      return Promise.reject(error)
    }
    if (!options.retryMobileSecondary) return

    const payload = { ...body }
    payload.secondary_phone = payload.mobile_phone
    delete payload.mobile_phone
    return this.call({
      method: 'put',
      endpoint: `/profiles/${id}`,
      body: payload
    })
  })
}

export default updateProfile
