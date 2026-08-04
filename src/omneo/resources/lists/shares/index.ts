
import { ListShareNested, ListShareNoProfile } from '@types'
import Resource from '../../resource.js'

export default class ListShares extends Resource {
  get (handle: string): Promise<ListShareNested> {
    return this.client.call({
      method: 'GET',
      endpoint: `/lists/shares/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  getNoProfile (handle: string): Promise<ListShareNoProfile> {
    return this.client.call({
      method: 'GET',
      endpoint: `/lists/shares/${handle}/no_profile`
    }).then((response) => {
      return response.data
    })
  }
}
