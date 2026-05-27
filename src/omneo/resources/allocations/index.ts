import { AllocationCountResponse, AllocationResponse, RequestQueryAllocation } from '@types'
import Resource from '../resource.js'

export default class Allocations extends Resource {
  list (params?: RequestQueryAllocation): Promise<AllocationResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/allocations',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  count (benefitDefinitionId: number): Promise<AllocationCountResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/allocations/${benefitDefinitionId}/count`
    }).then((response) => {
      return response.data
    })
  }
}
