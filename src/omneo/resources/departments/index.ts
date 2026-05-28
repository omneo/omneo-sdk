import { Department, DepartmentResponse, RequestCreateDepartment, RequestQueryDepartment, RequestUpdateDepartment } from '@types'
import Resource from '../resource.js'

export default class Departments extends Resource {
  list (params?: RequestQueryDepartment): Promise<DepartmentResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/departments',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Department> {
    return this.client.call({
      method: 'GET',
      endpoint: `/departments/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateDepartment): Promise<Department> {
    return this.client.call({
      method: 'POST',
      endpoint: '/departments',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateDepartment): Promise<Department> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/departments/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/departments/${id}`
    }).then((response) => {
      return response
    })
  }
}
