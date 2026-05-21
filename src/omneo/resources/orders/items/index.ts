import { OrderItem, OrderItemResponse, RequestParams } from '@types'
import Resource from '../../resource'

export default class OrderItems extends Resource {
  list (orderId: number, params?: RequestParams): Promise<OrderItemResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/orders/${orderId}/items`,
      params
    }).then((response) => {
      return response
    })
  }

  get (orderId: number, itemId: string): Promise<OrderItem> {
    return this.client.call({
      method: 'GET',
      endpoint: `/orders/${orderId}/items/${itemId}`
    }).then((response) => {
      return response.data
    })
  }

  create (orderId: number, body: OrderItem): Promise<OrderItem> {
    return this.client.call({
      method: 'POST',
      endpoint: `/orders/${orderId}/items`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (orderId: number, itemId: string, body: OrderItem): Promise<OrderItem> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/orders/${orderId}/items/${itemId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (orderId: number, itemId: string): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/orders/${orderId}/items/${itemId}`
    }).then((response) => {
      return response
    })
  }
}
