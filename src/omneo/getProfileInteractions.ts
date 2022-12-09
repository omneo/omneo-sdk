import { Omneo } from '..'
import { Interaction } from '../types'

async function getProfileInteractions (this: Omneo, profileID: string, params: object): Promise<Array<Interaction>> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${profileID}/interactions`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileInteractions
