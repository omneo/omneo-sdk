import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function getProfileByID (this: Omneo, id: string, params?: RequestParams): Promise<Profile> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${id}`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileByID
