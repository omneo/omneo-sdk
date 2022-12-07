import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function getProfileByEmail (this: Omneo, email: string, params?: RequestParams): Promise<Profile|undefined> {
  return this.call({
    method: 'get',
    endpoint: '/profiles',
    params: { 'filter[email]': email, ...params }
  }).then((response: any) => {
    return response.data?.[0]
  })
}

export default getProfileByEmail
