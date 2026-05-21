import { Order, OrderResponse, RequestParams } from '@types'
import Resource from '../resource'
import OrderItems from './items'

export default class Orders extends Resource {
  items = new OrderItems(this.client)

  get (id: string, params?: RequestParams): Promise<Order> {
    return this.client.call({
      method: 'GET',
      endpoint: `/orders/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<OrderResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/orders',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: Order): Promise<Order> {
    return this.client.call({
      method: 'POST',
      endpoint: '/orders',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: Order): Promise<Order> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/orders/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/orders/${id}`
    }).then((response) => {
      return response
    })
  }

  queue (body: Order) : Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/orders/queue',
      body
    }).then((response) => {
      return response
    })
  }

  queueCreate (body: Order) : Promise<{data: string}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/orders/queue/create',
      body
    }).then((response) => {
      return response
    })
  }

  resend (orderId: string): Promise<void> {
    return this.client.call({
      method: 'POST',
      endpoint: `/orders/${orderId}/resend`
    }).then((response) => {
      return response
    })
  }
}
