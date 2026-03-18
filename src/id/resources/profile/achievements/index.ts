import { ProfileAchievementPoint, CreateProfileAchievementInput, ProfileAchievementPointsResponse, ProfileAchievementsResponse, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAchievements extends Resource {
  getPoints (achievementDefinitionId: number): Promise<ProfileAchievementPointsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/achievements/${achievementDefinitionId}/achievement-points`
    }).then((response) => {
      return response
    })
  }

  list (params?: RequestParams): Promise<ProfileAchievementsResponse['data']> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/achievements',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateProfileAchievementInput): Promise<ProfileAchievementPoint> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/achievements',
      body
    }).then((response) => {
      return response.data
    })
  }
}
