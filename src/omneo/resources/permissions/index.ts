import { RequestParams } from '../../../types'
import { Permission, PermissionResponse } from '../../../types/permissions.js'
import Resource from '../resource.js'

export default class Permissions extends Resource {
  get (id: number): Promise<Permission> {
    return this.client.call({
      method: 'get',
      endpoint: `/permissions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<PermissionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/permissions',
      params
    })
  }
}
