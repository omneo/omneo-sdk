import { RequestParams, Appointment, AppointmentResponse, AppointmentDefinitionResponse, CreateProfileAppointmentInput, UpdateAppointmentInput } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAppointments extends Resource {
  get (profileID: string, appointmentID: number, params?: RequestParams): Promise<Appointment> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/appointments/${appointmentID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<AppointmentResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/appointments`,
      params
    })
  }

  create (profileID: string, body: CreateProfileAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileID}/appointments`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, appointmentID: number, body: UpdateAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/${profileID}/appointments/${appointmentID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, appointmentID: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/${profileID}/appointments/${appointmentID}`
    })
  }

  listVisibleDefinitions (profileID: string, params?: RequestParams): Promise<AppointmentDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileID}/appointment-definitions/visibility`,
      params
    })
  }
}
