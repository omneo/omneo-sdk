import { ProductListShare } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileListShares extends Resource {
  create (profileID: string, listID: number): Promise<ProductListShare> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/shares`
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number, shareId: number): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}/shares/${shareId}`
    }).then((response) => {
      return response
    })
  }
}
