import randomString from '../../../lib/string/random'

export const getName = () => { return `sdk_unit_test_reward_definition_name_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getHandle = () => { return `sdk_unit_test_reward_definition_handle_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getExternalId = () => { return `sdk_unit_test_reward_external_id_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
