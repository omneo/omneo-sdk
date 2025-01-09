import { ProfileBalances as ProfileBalancesType } from '../../../../types'
import Resource from '../../resource'

export default class ProfileBalances extends Resource {
  get (profileID: string): Promise<ProfileBalancesType> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/balances`
    }).then((response) => {
      return response.data
    })
  }
}
