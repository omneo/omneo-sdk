import randomString from '../../../lib/string/random'

export const getName = () => { return `sdk_unit_test_region_name_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getHandle = () => { return `sdk_unit_test_region_handle_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getIso2 = () => { return `sdk_unit_test_iso2_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getIso3 = () => { return `sdk_unit_test_iso3_${randomString(5).toLowerCase()}_${Math.floor(Date.now() / 1000)}` }
export const getIsoNumeric = () => { return `${Math.floor(Date.now()) + Math.floor(Math.random() * 1000)}` }
