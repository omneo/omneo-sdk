import { Omneo } from '..'
import { RequestParams } from '../types'

async function getProfileLists (this: Omneo, profileID: string, params: RequestParams): Promise<any> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${profileID}/lists`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileLists
