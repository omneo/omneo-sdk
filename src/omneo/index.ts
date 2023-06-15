import checkAvailability from './checkAvailability'
import createProfile from './createProfile'
import createProfileAddress from './createProfileAddress'
import createProfileIdentity from './createProfileIdentity'
import createTransaction from './createTransaction'
import deleteProfile from './deleteProfile'
import deleteProfileAddress from './deleteProfileAddress'
import deleteProfileIdentity from './deleteProfileIdentity'
import deleteTransaction from './deleteTransaction'
import findIdentityInProfile from './findIdentityInProfile'
import getProfileByEmail from './getProfileByEmail'
import getProfileByID from './getProfileByID'
import getProfileByIdentity from './getProfileByIdentity'
import getProfileLists from './getProfileLists'
import getTransaction from './getTransaction'
import isSubscribed from './isSubscribed'
import isUnsubscribed from './isUnsubscribed'
import updateProfile from './updateProfile'
import updateProfileAddress from './updateProfileAddress'
import updateTransaction from './updateTransaction'
import subscribe from './subscribe'
import unsubscribe from './unsubscribe'
import createProfileInteraction from './createProfileInteraction'
import getProfileInteractions from './getProfileInteractions'
import getProfileRewards from './getProfileRewards'
import listProfiles from './listProfiles'
import listTransactions from './listTransactions'
import getProfilePoints from './getProfilePoints'
import queueTransaction from './queueTransaction'
import getProducts from './getProducts'
import getTenantCustomFields from './getTenantCustomFields'
import createTenantCustomField from './createTenantCustomField'
import updateTenantCustomField from './updateTenantCustomField'
import createAPIToken from './createAPIToken'
import getEnvironmentSettings from './getEnvironmentSettings'
import deleteTenantCustomField from './deleteTenantCustomField'
import getProfileComms from './getProfileComms'
import getProfileAppearance from './getProfileAppearance'
import getLocationByID from './getLocationByID'
import createProduct from './createProduct'
import updateProduct from './updateProduct'
import queueProduct from './queueProduct'

export = {
  checkAvailability,
  createProfile,
  createProfileAddress,
  createProfileIdentity,
  createTransaction,
  deleteProfile,
  deleteProfileAddress,
  deleteProfileIdentity,
  deleteTransaction,
  findIdentityInProfile,
  getProfileByEmail,
  getProfileByID,
  getProfileByIdentity,
  getProfileLists,
  getProducts,
  getTransaction,
  isSubscribed,
  isUnsubscribed,
  updateProfile,
  updateProfileAddress,
  updateTransaction,
  subscribe,
  unsubscribe,
  createProfileInteraction,
  getProfileInteractions,
  getProfileRewards,
  listProfiles,
  listTransactions,
  getProfilePoints,
  queueTransaction,
  getTenantCustomFields,
  createTenantCustomField,
  updateTenantCustomField,
  deleteTenantCustomField,
  createAPIToken,
  getEnvironmentSettings,
  getProfileComms,
  getProfileAppearance,
  getLocationByID,
  createProduct,
  updateProduct,
  queueProduct
}
