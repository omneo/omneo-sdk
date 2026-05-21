import { Reminder, ReminderResponse, RequestParams } from '@types'
import Resource from '../resource.js'

export default class Reminders extends Resource {
  list (params?: RequestParams): Promise<ReminderResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/reminders',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Reminder> {
    return this.client.call({
      method: 'GET',
      endpoint: `/reminders/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: Reminder): Promise<Reminder> {
    return this.client.call({
      method: 'POST',
      endpoint: '/reminders',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Reminder): Promise<Reminder> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/reminders/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/reminders/${id}`
    }).then((response) => {
      return response
    })
  }
}
