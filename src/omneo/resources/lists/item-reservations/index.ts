import { RequestCreateProductListReservation, ProductListReservation, RequestUpdateProductListReservation } from '@types'
import Resource from '../../resource.js'

export default class ListItemReservations extends Resource {
  create (itemId: number, body: RequestCreateProductListReservation): Promise<ProductListReservation> {
    return this.client.call({
      method: 'POST',
      endpoint: `/list/items/${itemId}/reservations`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (itemId: number, reservationId: number, body: RequestUpdateProductListReservation): Promise<ProductListReservation> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/list/items/${itemId}/reservations/${reservationId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (itemId: number, reservationId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/list/items/${itemId}/reservations/${reservationId}`
    }).then((response) => {
      return response
    })
  }
}
