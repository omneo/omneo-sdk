
import { ProductListShareNested, ProductListShareNestedNoProfile } from '@types'
import Resource from '../../resource.js'

export default class ListShares extends Resource {
  get (handle: string): Promise<ProductListShareNested> {
    return this.client.call({
      method: 'GET',
      endpoint: `/lists/shares/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  getNoProfile (handle: string): Promise<ProductListShareNestedNoProfile> {
    return this.client.call({
      method: 'GET',
      endpoint: `/lists/shares/${handle}/no_profile`
    }).then((response) => {
      return response.data
    })
  }
}
