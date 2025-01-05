import { Role, RoleResponse } from '../../../types'
import Resource from '../resource'

export default class Roles extends Resource {
  get (id: number): Promise<Role> {
    return this.client.call({
      method: 'get',
      endpoint: `/roles/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (): Promise<RoleResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/roles'
    }).then((response) => {
      return response
    })
  }
}
