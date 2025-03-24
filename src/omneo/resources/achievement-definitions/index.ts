import { AchievementDefinition, AchievementDefinitionInput, AchievementDefinitionResponse } from '../../../types'
import { RequestParams } from '../../../types/index.js'
import Resource from '../resource.js'

export default class AchievementDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<AchievementDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/achievements/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AchievementDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/achievements/definitions',
      params
    })
  }

  create (body: AchievementDefinitionInput): Promise<AchievementDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/achievements/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<AchievementDefinitionInput>): Promise<AchievementDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/achievements/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/achievements/definitions/${id}`
    })
  }
}
