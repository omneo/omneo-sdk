import { CreateReminderInput, Reminder, ReminderResponse, RequestParams, UpdateReminderInput } from '@types'
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

  create (body: CreateReminderInput): Promise<Reminder> {
    return this.client.call({
      method: 'POST',
      endpoint: '/reminders',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateReminderInput): Promise<Reminder> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/reminders/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  destroy (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/reminders/${id}`
    }).then((response) => {
      return response
    })
  }
}
