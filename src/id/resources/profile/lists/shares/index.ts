import { ProductListShare } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileListShares extends Resource {
  create (listID: number): Promise<ProductListShare> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/lists/${listID}/shares`
    }).then((response) => {
      return response.data
    })
  }

  delete (listID: number, shareId: number): Promise<any> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}/shares/${shareId}`
    }).then((response) => {
      return response
    })
  }
}
