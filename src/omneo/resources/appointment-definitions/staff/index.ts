import { RequestParams, AppointmentDefinitionStaff as AppointmentDefinitionStaffRecord, CreateAppointmentDefinitionStaffInput, UpdateAppointmentDefinitionStaffInput } from '@types'
import Resource from '../../resource.js'

export default class AppointmentDefinitionStaff extends Resource {
  // Not Paginated
  list (definitionID: number, params?: RequestParams): Promise<AppointmentDefinitionStaffRecord[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/staff`,
      params
    }).then((response) => {
      return response.data
    })
  }

  get (definitionID: number, id: number, params?: RequestParams): Promise<AppointmentDefinitionStaffRecord> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/staff/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  create (definitionID: number, body: CreateAppointmentDefinitionStaffInput): Promise<AppointmentDefinitionStaffRecord> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/staff`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (definitionID: number, id: number, body: UpdateAppointmentDefinitionStaffInput): Promise<AppointmentDefinitionStaffRecord> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-definitions/${definitionID}/staff/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (definitionID: number, id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-definitions/${definitionID}/staff/${id}`
    })
  }
}
