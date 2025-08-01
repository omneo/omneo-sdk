import { ProfileDatesAttribute, ProfileDatesAttributeInput, RequestParams } from '../../../../../types'
import Resource from '../../../resource'

export default class ProfileAttributesDates extends Resource {
  list (params?: RequestParams): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/attributes/dates',
      params
    }).then((response) => {
      return response.data
    })
  }

  update (payload: ProfileDatesAttributeInput): Promise<ProfileDatesAttribute> {
    return this.client.call({
      method: 'put',
      endpoint: '/profiles/me/attributes/dates',
      body: payload
    }).then((response) => {
      return response.data
    })
  }

  delete (dateID: number): Promise<ProfileDatesAttribute[]> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/attributes/dates/${dateID}`
    }).then((response) => {
      return response.data
    })
  }
}
