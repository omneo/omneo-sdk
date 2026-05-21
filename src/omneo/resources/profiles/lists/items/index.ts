import { ProductListItem, RequestCreateProductListItem, RequestCreateCustomProductListItem, ProductListItemResponse } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileListItems extends Resource {
  get (profileID: string, listID: number, listItemID: number): Promise<ProductListItem> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, listID: number): Promise<ProductListItemResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/lists/${listID}/items`
    }).then((response) => {
      return response
    })
  }

  create (profileID: string, listID: number, body: RequestCreateProductListItem): Promise<ProductListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }

  custom (profileID: string, listID: number, body: RequestCreateCustomProductListItem): Promise<ProductListItem> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/lists/${listID}/custom`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, listID: number, listItemID: number, body: RequestCreateProductListItem): Promise<ProductListItem> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, listID: number, listItemID: number): Promise<ProductListItem> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/lists/${listID}/items/${listItemID}`
    }).then((response) => {
      return response
    })
  }
}
