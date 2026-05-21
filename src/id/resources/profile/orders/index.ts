import { RequestParams, Order, OrderResponse, ProfileOrderIndexGroupResponse } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileOrders extends Resource {
  get (orderID: number): Promise<Order> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/orders/${orderID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<OrderResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/orders',
      params
    }).then((response) => {
      return response
    })
  }

  listGroup (): Promise<ProfileOrderIndexGroupResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/group_orders'
    }).then((response) => {
      return response
    })
  }
}
