/* eslint-disable camelcase */
import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

const CREATED_POINTS = [] as number[]

const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

describe('Points create', () => {
  test('SDK can create points no remaining specified', async () => {
    const pointPayload = {
      profile_id: testProfileID,
      value_initial: 0.1,
      point_definition_id: 1,
      issued_at: '2024-01-01 00:00:00',
      meta: {
        test: true
      }
    }
    const sdkPoint = await omneo.points.create(pointPayload)

    expect(sdkPoint).toHaveProperty('id')
    CREATED_POINTS.push(sdkPoint.id)

    expect(sdkPoint.value_initial).toEqual(pointPayload.value_initial)
    expect(sdkPoint.value_remaining).toEqual(pointPayload.value_initial)
    expect(sdkPoint.profile_id).toEqual(pointPayload.profile_id)
    expect(sdkPoint.definition.id).toEqual(pointPayload.point_definition_id)
    expect(sdkPoint.issued_at).toEqual(pointPayload.issued_at)
  })

  test('SDK can create points with remaining less than initial', async () => {
    const pointPayload = {
      profile_id: testProfileID,
      value_initial: 0.2,
      value_remaining: 0.1,
      point_definition_id: 1,
      issued_at: '2024-01-01 00:00:00',
      meta: {
        test: true
      }
    }
    const sdkPoint = await omneo.points.create(pointPayload)

    expect(sdkPoint).toHaveProperty('id')
    CREATED_POINTS.push(sdkPoint.id)

    expect(sdkPoint.value_initial).toEqual(pointPayload.value_initial)
    expect(sdkPoint.value_remaining).toEqual(pointPayload.value_remaining)
  })
})

// Points can't be deleted
// afterAll(async () => {
//   if (CREATED_POINTS.length > 0) {
//     for (const pointID of CREATED_POINTS) {
//       console.log('Cleaning up SDK Point with ID', pointID)
//       const deleteResponse = await simpleOmneoRequest('DELETE', `/points/${pointID}`)
//       if (deleteResponse.status < 200 || deleteResponse.status >= 300) {
//         console.log('Failed to delete Points ID', pointID)
//       }
//       if (deleteResponse.status === 204) {
//         console.log(`SDK Point ID ${pointID} nullified`)
//       }
//     }
//   }
// })
