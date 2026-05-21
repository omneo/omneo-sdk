import { ProfileAchievementPointResponse, ProfileAchievement, RequestCreateProfileAchievement, AchievementPoint, RequestParams } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileAchievements extends Resource {
  getPoints (achievementDefinitionId: number): Promise<ProfileAchievementPointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/achievements/${achievementDefinitionId}/achievement-points`
    }).then((response) => {
      return response
    })
  }

  list (params?: RequestParams): Promise<ProfileAchievement[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/achievements',
      params
    }).then((response) => {
      return response.data
    })
  }

  create (body: RequestCreateProfileAchievement): Promise<AchievementPoint> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/achievements',
      body
    }).then((response) => {
      return response.data
    })
  }
}
