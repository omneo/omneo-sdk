import { RequestParams, ProfileNormalHour, CreateProfileNormalHourInput, UpdateProfileNormalHourInput } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileNormalHours extends Resource {
  // Not Paginated
  list (profileID: string, params?: RequestParams): Promise<ProfileNormalHour[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/normal-hours`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (profileID: string, id: number, params?: RequestParams): Promise<ProfileNormalHour> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/normal-hours/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: string, body: CreateProfileNormalHourInput): Promise<ProfileNormalHour> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileID}/normal-hours`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, id: number, body: UpdateProfileNormalHourInput): Promise<ProfileNormalHour> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/${profileID}/normal-hours/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/${profileID}/normal-hours/${id}`
    })
  }
}
