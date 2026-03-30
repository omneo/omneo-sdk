import { ListItemReservation } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileListReservations extends Resource {
  list (profileId: string): Promise<ListItemReservation[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/reservations`
    }).then((response) => {
      return response.data
    })
  }
}
