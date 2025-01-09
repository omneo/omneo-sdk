import { ProfileInput } from '.'

export type ProfileBatchMatchCriteria = 'email' | 'string' // 'email' to match email, or any other string to match identity handle
export type ProfileBatchInput = {
  match_criteria: ProfileBatchMatchCriteria
  profiles: Partial<ProfileInput>[]
}
