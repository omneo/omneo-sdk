import { ProfileDatesAttribute, RequestParams } from '../../../../types'
import Resource from '../../resource'

export default class ProfileAttributesDates extends Resource {
  list (profileID: string, params?: RequestParams): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/attributes/dates`,
      params
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, dateID: number): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/attributes/dates/${dateID}`
    }).then((response) => {
      return response.data
    })
  }
}
