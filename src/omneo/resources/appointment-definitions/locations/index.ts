import { RequestParams, AppointmentDefinitionLocation, CreateAppointmentDefinitionLocationInput, UpdateAppointmentDefinitionLocationInput } from '@types'
import Resource from '../../resource.js'

export default class AppointmentDefinitionLocations extends Resource {
  // Not Paginated
  list (definitionID: number, params?: RequestParams): Promise<AppointmentDefinitionLocation[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/locations`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (definitionID: number, id: number, params?: RequestParams): Promise<AppointmentDefinitionLocation> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/locations/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (definitionID: number, body: CreateAppointmentDefinitionLocationInput): Promise<AppointmentDefinitionLocation> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/locations`,
      body
    }).then((response) => {
      return response.data
    })
  }

  // Omneo API quirk: update resolves the location id, while get and delete
  // resolve the attachment row id
  update (definitionID: number, locationID: number, body: UpdateAppointmentDefinitionLocationInput): Promise<AppointmentDefinitionLocation> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-definitions/${definitionID}/locations/${locationID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (definitionID: number, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-definitions/${definitionID}/locations/${id}`
    })
  }
}
