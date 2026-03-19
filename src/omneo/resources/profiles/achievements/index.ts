import { ProfileAchievementPoint, CreateProfileAchievementInput, ProfileAchievementPointsResponse, ProfileAchievementsResponse, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAchievements extends Resource {
  getPoints (profileId: string, achievementDefinitionId: number): Promise<ProfileAchievementPointsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/achievements/${achievementDefinitionId}/achievement-points`
    }).then((response) => {
      // with paginations
      return response
    })
  }

  list (profileId: string, params?: RequestParams): Promise<ProfileAchievementsResponse['data']> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/achievements`,
      params
    }).then((response) => {
      // no paginations
      return response.data
    })
  }

  create (profileId: string, body: CreateProfileAchievementInput): Promise<ProfileAchievementPoint> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileId}/achievements`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
