import { Omneo } from '..'
import { Reward } from '../types'

async function getProfilePoints (this: Omneo, profileID: string, params: object): Promise<Reward> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${profileID}/points`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfilePoints
