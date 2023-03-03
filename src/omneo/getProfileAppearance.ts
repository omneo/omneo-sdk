import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function getProfileAppearance (this: Omneo, id: string, params?: RequestParams): Promise<Profile> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${id}/attributes/appearance`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileAppearance
