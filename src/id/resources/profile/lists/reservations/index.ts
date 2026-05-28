import { ProductListReservation } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileListReservations extends Resource {
  list (): Promise<ProductListReservation> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/reservations'
    }).then((response) => {
      return response.data
    })
  }
}
