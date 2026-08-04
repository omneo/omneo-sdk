import { RequestParams, Order, OrderResponse, GroupOrderResponse } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileOrders extends Resource {
  get (profileID: string, orderID: number): Promise<Order> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/orders/${orderID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<OrderResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/orders`,
      params
    }).then((response) => {
      return response
    })
  }

  listGroup (profileID: string, params?: RequestParams): Promise<GroupOrderResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/group_orders`,
      params
    }).then((response) => {
      return response
    })
  }
}
