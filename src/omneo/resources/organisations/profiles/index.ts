import { CreateOrganisationProfileInput, Profile, ProfileResponse, RequestParams } from '@types'
import Resource from '../../resource.js'

export default class OrganisationProfiles extends Resource {
  list (organisationId: string, params?: RequestParams): Promise<ProfileResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/organisations/${organisationId}/profiles`,
      params
    }).then((response) => {
      return response
    })
  }

  create (organisationId: string, body: CreateOrganisationProfileInput): Promise<Profile> {
    return this.client.call({
      method: 'POST',
      endpoint: `/organisations/${organisationId}/profiles`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (organisationId: number, profileId: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/organisations/${organisationId}/profiles/${profileId}`
    }).then((response) => {
      return response
    })
  }
}
