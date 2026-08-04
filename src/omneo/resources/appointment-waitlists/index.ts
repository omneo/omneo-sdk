import { RequestParams, AppointmentWaitlist, AppointmentWaitlistResponse, CreateAppointmentWaitlistInput, UpdateAppointmentWaitlistInput } from '@types'
import Resource from '../resource.js'

export default class AppointmentWaitlists extends Resource {
  get (id: number, params?: RequestParams): Promise<AppointmentWaitlist> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-waitlists/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AppointmentWaitlistResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/appointment-waitlists',
      params
    })
  }

  create (body: CreateAppointmentWaitlistInput): Promise<AppointmentWaitlist> {
    return this.client.call({
      method: 'POST',
      endpoint: '/appointment-waitlists',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateAppointmentWaitlistInput): Promise<AppointmentWaitlist> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-waitlists/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-waitlists/${id}`
    })
  }
}
