import { Omneo } from '..'
import { ProfileComms, RequestParams } from '../types'

async function getProfileComms (this: Omneo, id: string, params?: RequestParams): Promise<ProfileComms> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${id}/attributes/comms`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileComms
