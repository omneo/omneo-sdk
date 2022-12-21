import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function listProfiles (this: Omneo, params?: RequestParams): Promise<{data: Array<Profile>, links: any, meta: any}> {
  return this.call({
    method: 'get',
    endpoint: '/profiles',
    params
  }).then((response: any) => {
    return response.data
  })
}

export default listProfiles
