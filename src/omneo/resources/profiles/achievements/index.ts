import { ProfileAchievementPointResponse, ProfileAchievement, RequestParams } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileAchievements extends Resource {
  getPoints (profileId: string, achievementDefinitionId: number): Promise<ProfileAchievementPointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/achievements/${achievementDefinitionId}/achievement-points`
    }).then((response) => {
      // with paginations
      return response
    })
  }

  list (profileId: string, params?: RequestParams): Promise<ProfileAchievement[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/achievements`,
      params
    }).then((response) => {
      // no paginations
      return response.data
    })
  }

  create (profileId: string, body: ProfileAchievement): Promise<ProfileAchievement> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileId}/achievements`,
      body
    }).then((response) => {
      return response.data
    })
  }
}
