import { RequestParams, Appointment, AppointmentResponse, AppointmentDefinitionResponse, CreateProfileAppointmentInput, UpdateAppointmentInput } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAppointments extends Resource {
  get (appointmentID: number, params?: RequestParams): Promise<Appointment> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/me/appointments/${appointmentID}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AppointmentResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/appointments',
      params
    })
  }

  create (body: CreateProfileAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'POST',
      endpoint: '/profiles/me/appointments',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (appointmentID: number, body: UpdateAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/profiles/me/appointments/${appointmentID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (appointmentID: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/profiles/me/appointments/${appointmentID}`
    })
  }

  listVisibleDefinitions (params?: RequestParams): Promise<AppointmentDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/appointment-definitions/visibility',
      params
    })
  }
}
