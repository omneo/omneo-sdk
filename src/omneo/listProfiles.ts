import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function listProfiles (this: Omneo, params?: RequestParams): Promise<Array<Profile>> {
  return this.call({
    method: 'get',
    endpoint: '/profiles',
    params
  }).then((response) => {
    return response.data
  })
}

export default listProfiles
