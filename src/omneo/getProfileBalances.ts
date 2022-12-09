import { Omneo } from '..'
import { ProfileBalances } from '../types'

async function getProfileBalances (this: Omneo, profileID: string, params: object): Promise<ProfileBalances> {
  return this.call({
    method: 'get',
    endpoint: `/profiles/${profileID}/balances`,
    params
  }).then((response) => {
    return response.data
  })
}

export default getProfileBalances
