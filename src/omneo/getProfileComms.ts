import { Omneo } from '..'
import { Profile, RequestParams } from '../types'

async function getProfileComms (this: Omneo, id: string, params?: RequestParams): Promise<Profile> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${id}/attributes/comms`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileComms
