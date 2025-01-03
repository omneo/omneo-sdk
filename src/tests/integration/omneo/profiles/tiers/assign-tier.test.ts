// Tests can be re-added once omneo bugs with calculating tiers bugs are fixed, can delete tier definitions
import { describe } from 'vitest'
// import { Omneo } from '../../../../..'
// import simpleOmneoRequest from '../../../../lib/simple-omneo-request'

// const CREATED_TIER_DEFINITIONS = [] as number[]

// const omneo = new Omneo({
//   tenant: process.env.OMNEO_TENANT as string,
//   token: process.env.OMNEO_TOKEN as string
// })

// const testProfileID = process.env.OMNEO_TEST_PROFILE_ID as string

// const definitionPayload = {
//   name: `assign_profile_tier_${Date.now()}`,
//   handle: `assign_profile_tier_${Date.now()}`,
//   description: `SDK integration test - ${Date.now()}`,
//   value_min: Math.floor(Math.random() * 1000) + 1,
//   value_maintain: Math.floor(Math.random() * 1000) + 1,
//   is_assignable: true,
//   is_floor: false
// }

describe('Assign Profile Tier', async () => {
  // test('SDK can assign a profile tier.', async () => {
  //   const definition = await simpleOmneoRequest('POST', '/tiers/definitions', definitionPayload).then(({ data }) => {
  //     CREATED_TIER_DEFINITIONS.push(data.id)
  //     return data
  //   })
  //   const tiers = await omneo.profiles.assignTier(testProfileID, definition.handle)
  //   expect(tiers.current_tier?.handle === definition.handle)
  // })
})

// TODO Deleting tier definitions while assigned to a profile causes API errors, re add  this code when bug fixed

// afterAll(async () => {
//   if (CREATED_TIER_DEFINITIONS.length > 0) {
//     for (const tierDefID of CREATED_TIER_DEFINITIONS) {
//       console.log('Cleaning up SDK Tier Definitions with ID', tierDefID)
//       const deleteResponse = await simpleOmneoRequest('DELETE', `/tiers/definitions/${tierDefID}`)
//       if (deleteResponse.status < 200 || deleteResponse.status >= 300) {
//         console.log('Failed to delete Tier Definition ID', tierDefID)
//       }
//       if (deleteResponse.status === 204) {
//         console.log(`SDK Tier Definition ID ${tierDefID} deleted`)
//       }
//     }
//   }
// })
