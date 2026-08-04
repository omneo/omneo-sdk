import { RequestParams, AppointmentDefinitionNormalHour, CreateAppointmentDefinitionNormalHourInput, UpdateAppointmentDefinitionNormalHourInput } from '@types'
import Resource from '../../resource.js'

export default class AppointmentDefinitionNormalHours extends Resource {
  // Not Paginated
  list (definitionID: number, params?: RequestParams): Promise<AppointmentDefinitionNormalHour[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/normal-hours`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (definitionID: number, id: number, params?: RequestParams): Promise<AppointmentDefinitionNormalHour> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/normal-hours/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (definitionID: number, body: CreateAppointmentDefinitionNormalHourInput): Promise<AppointmentDefinitionNormalHour> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/normal-hours`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (definitionID: number, id: number, body: UpdateAppointmentDefinitionNormalHourInput): Promise<AppointmentDefinitionNormalHour> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-definitions/${definitionID}/normal-hours/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (definitionID: number, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-definitions/${definitionID}/normal-hours/${id}`
    })
  }
}
