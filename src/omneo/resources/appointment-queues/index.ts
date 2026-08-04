import { RequestParams, AppointmentQueue, AppointmentQueueResponse, CreateAppointmentQueueInput, UpdateAppointmentQueueInput } from '@types'
import Resource from '../resource.js'

export default class AppointmentQueues extends Resource {
  get (id: number, params?: RequestParams): Promise<AppointmentQueue> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-queues/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AppointmentQueueResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/appointment-queues',
      params
    })
  }

  create (body: CreateAppointmentQueueInput): Promise<AppointmentQueue> {
    return this.client.call({
      method: 'POST',
      endpoint: '/appointment-queues',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateAppointmentQueueInput): Promise<AppointmentQueue> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-queues/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-queues/${id}`
    })
  }
}
