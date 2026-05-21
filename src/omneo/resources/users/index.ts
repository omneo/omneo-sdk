import { RequestParams, User, RequestCreateUser, UserResponse, RequestUpdateUser } from '@types'
import Resource from '../resource.js'

export default class Users extends Resource {
  me (): Promise<User> {
    return this.client.call({
      method: 'get',
      endpoint: '/users/me'
    })
  }

  get (id: number, params?: RequestParams): Promise<User> {
    return this.client.call({
      method: 'get',
      endpoint: `/users/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<UserResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/users',
      params
    })
  }

  create (body: RequestCreateUser): Promise<User> {
    return this.client.call({
      method: 'post',
      endpoint: '/users',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<RequestUpdateUser>): Promise<User> {
    return this.client.call({
      method: 'put',
      endpoint: `/users/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/users/${id}`
    }).then((response) => {
      return response.data
    })
  }
}
