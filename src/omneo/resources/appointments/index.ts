import { RequestParams, Appointment, AppointmentResponse, CreateAppointmentInput, UpdateAppointmentInput, AppointmentLinkInput } from '@types'
import Resource from '../resource.js'

export default class Appointments extends Resource {
  get (id: number, params?: RequestParams): Promise<Appointment> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointments/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AppointmentResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/appointments',
      params
    })
  }

  create (body: CreateAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'POST',
      endpoint: '/appointments',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateAppointmentInput): Promise<Appointment> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointments/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointments/${id}`
    })
  }

  link (id: number, body: AppointmentLinkInput): Promise<Appointment> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointments/${id}/link`,
      body
    }).then((response) => {
      return response.data
    })
  }

  unlink (id: number, body: AppointmentLinkInput): Promise<void> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointments/${id}/unlink`,
      body
    })
  }
}
