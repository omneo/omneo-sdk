import { ProductList, RequestCreateProductList, RequestParams } from '@types'
import Resource from '@id/resources/resource'
import Items from './items'
import CustomFields from './custom-fields'
import Shares from './shares'
import Reservations from './reservations'

export default class ProfileLists extends Resource {
  items = new Items(this.client)
  customFields = new CustomFields(this.client)
  shares = new Shares(this.client)
  reservations = new Reservations(this.client)

  get (listID: number): Promise<ProductList> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<ProductList[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/lists',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (listInput: RequestCreateProductList): Promise<ProductList> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/lists',
      body: listInput
    }).then((response) => {
      return response.data
    })
  }

  update (listID: number, body: Partial<RequestCreateProductList>): Promise<ProductList> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/lists/${listID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (listID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/lists/${listID}`
    }).then((response) => {
      return response
    })
  }
}
