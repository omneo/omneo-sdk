import { RequestParams, CreateStaffInput, Staff, StaffResponse, UpdateStaffInput } from '@types'
import Resource from '../resource.js'

export default class Staffs extends Resource {
  list (handle: string, params?: RequestParams): Promise<StaffResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/staff/${handle}`,
      params
    }).then((response) => {
      return response
    })
  }

  create (body: CreateStaffInput): Promise<Staff> {
    return this.client.call({
      method: 'POST',
      endpoint: '/staff',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (staffId: number, body: UpdateStaffInput): Promise<Staff> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/staff/${staffId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (staffId: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/staff/${staffId}`
    }).then((response) => {
      return response
    })
  }
}
