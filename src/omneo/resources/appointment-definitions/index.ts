import { RequestParams, AppointmentDefinition, AppointmentDefinitionResponse, CreateAppointmentDefinitionInput, UpdateAppointmentDefinitionInput, AppointmentDefinitionQuestions, AppointmentAvailableSlotsInput, AppointmentAvailableSlotsResponse, AppointmentAvailableSlotsRangeInput, AppointmentAvailableSlotsRangeResponse, AppointmentAvailableStaffInput, AppointmentAvailableStaffResponse } from '@types'
import Resource from '../resource.js'
import AppointmentDefinitionLocations from './locations'
import AppointmentDefinitionNormalHours from './normal-hours'
import AppointmentDefinitionSpecialHours from './special-hours'
import AppointmentDefinitionStaff from './staff'

export default class AppointmentDefinitions extends Resource {
  locations = new AppointmentDefinitionLocations(this.client)
  normalHours = new AppointmentDefinitionNormalHours(this.client)
  specialHours = new AppointmentDefinitionSpecialHours(this.client)
  staff = new AppointmentDefinitionStaff(this.client)

  get (id: number, params?: RequestParams): Promise<AppointmentDefinition> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AppointmentDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/appointment-definitions',
      params
    })
  }

  create (body: CreateAppointmentDefinitionInput): Promise<AppointmentDefinition> {
    return this.client.call({
      method: 'POST',
      endpoint: '/appointment-definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateAppointmentDefinitionInput): Promise<AppointmentDefinition> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/appointment-definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/appointment-definitions/${id}`
    })
  }

  getQuestions (definitionID: number): Promise<AppointmentDefinitionQuestions> {
    return this.client.call({
      method: 'GET',
      endpoint: `/appointment-definitions/${definitionID}/questions`
    }).then((response) => {
      return response.data
    })
  }

  availableSlots (definitionID: number, body: AppointmentAvailableSlotsInput): Promise<AppointmentAvailableSlotsResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/available-slots`,
      body
    })
  }

  availableSlotsRange (definitionID: number, body: AppointmentAvailableSlotsRangeInput): Promise<AppointmentAvailableSlotsRangeResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/available-slots-range`,
      body
    })
  }

  availableStaff (definitionID: number, body: AppointmentAvailableStaffInput): Promise<AppointmentAvailableStaffResponse> {
    return this.client.call({
      method: 'POST',
      endpoint: `/appointment-definitions/${definitionID}/available-staff`,
      body
    })
  }
}
