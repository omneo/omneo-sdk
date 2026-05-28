
import { ProductList, ProductListResponse, RequestQueryProductList } from '@types'
import Resource from '../resource.js'
import ListItemReservations from './item-reservations/index.js'
import ListShares from './shares/index.js'

export default class Lists extends Resource {
  itemReservations = new ListItemReservations(this.client)
  shares = new ListShares(this.client)

  get (listId: number): Promise<ProductList> {
    return this.client.call({
      method: 'GET',
      endpoint: `/lists/${listId}`
    }).then((response) => {
      return response.data
    })
  }

  search (params: RequestQueryProductList): Promise<ProductListResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/product-lists/search',
      params
    }).then((response) => {
      return response
    })
  }
}
