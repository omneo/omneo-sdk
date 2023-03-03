import { Omneo } from '..'
import { ProfileAppearance, RequestParams } from '../types'

async function getProfileAppearance (this: Omneo, id: string, params?: RequestParams): Promise<ProfileAppearance> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${id}/attributes/appearance`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileAppearance
