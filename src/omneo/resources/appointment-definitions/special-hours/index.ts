import { RequestParams, AppointmentDefinitionSpecialHour, CreateAppointmentDefinitionSpecialHourInput, UpdateAppointmentDefinitionSpecialHourInput } from '@types'
import Resource from '../../resource.js'

export default class AppointmentDefinitionSpecialHours extends Resource {
  // Not Paginated
  list (definitionID: number, params?: RequestParams): Promise<AppointmentDefinitionSpecialHour[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/special-hours`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (definitionID: number, id: number, params?: RequestParams): Promise<AppointmentDefinitionSpecialHour> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/special-hours/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (definitionID: number, body: CreateAppointmentDefinitionSpecialHourInput): Promise<AppointmentDefinitionSpecialHour> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/special-hours`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (definitionID: number, id: number, body: UpdateAppointmentDefinitionSpecialHourInput): Promise<AppointmentDefinitionSpecialHour> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-definitions/${definitionID}/special-hours/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (definitionID: number, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-definitions/${definitionID}/special-hours/${id}`
    })
  }
}
