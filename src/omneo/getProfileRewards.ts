import { Omneo } from '..'
import { Reward } from '../types'

async function getProfileRewards (this: Omneo, profileID: string, params: object): Promise<Reward> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${profileID}/rewards`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileRewards
