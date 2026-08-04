import { RequestParams, ProfileSpecialHour, CreateProfileSpecialHourInput, UpdateProfileSpecialHourInput } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileSpecialHours extends Resource {
  // Not Paginated
  list (profileID: string, params?: RequestParams): Promise<ProfileSpecialHour[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/special-hours`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (profileID: string, id: number, params?: RequestParams): Promise<ProfileSpecialHour> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/special-hours/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (profileID: string, body: CreateProfileSpecialHourInput): Promise<ProfileSpecialHour> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileID}/special-hours`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, id: number, body: UpdateProfileSpecialHourInput): Promise<ProfileSpecialHour> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/${profileID}/special-hours/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/${profileID}/special-hours/${id}`
    })
  }
}
