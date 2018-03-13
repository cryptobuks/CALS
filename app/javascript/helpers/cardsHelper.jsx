import Immutable from 'immutable'
import {checkArrayObjectPresence, isBoolean} from './commonHelper'

export const addCardAsJS = (inputArray, newCardFields) => {
  if (Immutable.Iterable.isIterable(inputArray)) {
    return addCardAsImmutable(inputArray, newCardFields)
  } else {
    return Immutable.fromJS(inputArray).push(newCardFields).toJS()
  }
}

export const addCardAsImmutable = (inputArray, newCardFields) => {
  return inputArray.push(newCardFields)
}

export const removeCard = (inputArray, index, newCardFields) => {
  if (Immutable.Iterable.isIterable(inputArray)) {
    return removeCardAsImmutable(inputArray, index, newCardFields)
  } else {
    let inputList = Immutable.fromJS(inputArray)
    inputList = inputList.delete(index)
    if (inputList.size === 0) {
      inputList = inputList.push(newCardFields)
    }
    return inputList.toJS()
  }
}

export const removeCardAsImmutable = (inputArray, index, newCardFields) => {
  let inputList = inputArray.delete(index)
  if (inputList.size === 0) {
    inputList = inputList.push(newCardFields)
  }
  return inputList
}

export const removeCardWithId = (inputArray, index, newCardFields) => {
  if (Immutable.Iterable.isIterable(inputArray)) {
    return removeCardWithIdAsImmutable(inputArray, index, newCardFields)
  } else {
    let inputList = Immutable.fromJS(inputArray)
    let itemForDeletion = inputList.get(index)
    let visibleCount = inputArray.length
    // the item marked for deletion has already been saved once,
    // so we need to add a flag for deletion to make a delete api call
    // rather than an update api call.
    if (itemForDeletion.get('id')) {
      itemForDeletion = itemForDeletion.set('to_delete', true)
      inputList = inputList.set(index, itemForDeletion)
      visibleCount--
    } else {
      inputList = inputList.delete(index)
      visibleCount--
    }
    if (visibleCount === 0) {
      inputList = inputList.push(newCardFields)
    }
    return inputList.toJS()
  }
}

export const removeCardWithIdAsImmutable = (inputArray, index, newCardFields) => {
  let itemForDeletion = inputArray.get(index)
  let visibleCount = inputArray.length
  if (itemForDeletion.get('id')) {
    itemForDeletion = itemForDeletion.set('to_delete', true)
    inputArray = inputArray.set(index, itemForDeletion)
    visibleCount--
  } else {
    inputArray = inputArray.delete(index)
    visibleCount--
  }
  if (visibleCount === 0) {
    inputArray = inputArray.push(newCardFields)
  }
  return inputArray
}

export const getFocusClassName = (focusedComponentName, currentComponentName) => {
  return focusedComponentName === currentComponentName ? 'edit' : 'show'
}

export const setToWhomOptionList = (applicants) => {
  const newApplicants = applicants.map((applicant, index) => {
    return {id: applicant.id, value: applicant.first_name + ' ' + applicant.middle_name + ' ' + applicant.last_name}
  })
  return newApplicants
}

export const handleRelationshipTypeToApplicant = (index, value, type, items) => {
  let itemsList = Immutable.fromJS(items)
  itemsList = itemsList.setIn([index, 'relationship_to_applicants', 0, type], value)
  return itemsList.toJS()
}

export const handleToWhomValue = (applicantId, applicants) => {
  let newApplicants = {id: '', value: ''}
  if (applicantId) {
    newApplicants = applicants.map((applicant) => {
      return {id: (applicant.id ? applicant.id : 0), value: applicant.first_name + ' ' + applicant.middle_name + ' ' + applicant.last_name}
    })
    if (!isNaN(Number(applicantId))) {
      newApplicants = newApplicants.find(x => x.id === Number(applicantId))
    }
  }
  return newApplicants
}
export const checkForNameValidation = (applicantData) => {
  let validationResult = false
  if (checkArrayObjectPresence(applicantData)) {
    if (applicantData[0] && applicantData[0].first_name && applicantData[0].last_name) {
      validationResult = applicantData[0].first_name.trim().length > 0 && applicantData[0].last_name.trim().length > 0
    }
  }
  return validationResult
}

export const checkFieldsForSubmit = (application) => {
  let validationResult = false
  let isValidApplicants = true
  if (typeof (application.applicants) !== 'undefined') {
    for (let i = 0; i < application.applicants.length; i++) {
      let isValidApplicant = isApplicantReadyForSubmit(application.applicants[i])
      isValidApplicants = isValidApplicants && isValidApplicant
    }
  } else {
    isValidApplicants = false
  }
  validationResult = isValidApplicants && isResidenceReadyForSubmit(application.residence)
  // residence.addresses[0] is always residentail address
  validationResult = validationResult && isAddressReadyForSubmit(application.residence.addresses[0])
  return validationResult
}

export const isApplicantReadyForSubmit = (applicant) => {
  let isValidName = (
    applicant.first_name.trim().length > 0 &&
    applicant.last_name.trim().length > 0 &&
    (typeof (applicant.date_of_birth) !== 'undefined' && applicant.date_of_birth.length > 0))
  let isValidDLState = true
  if (applicant.driver_license_number.trim().length > 0) {
    isValidDLState = applicant.driver_license_state && Object.keys(applicant.driver_license_state).length > 0
  }
  let isValidPhone = false
  if (typeof (applicant.phones) !== 'undefined' && applicant.phones) {
    isValidPhone = true
    for (let j = 0; j < applicant.phones.length; j++) {
      isValidPhone = isValidPhone && applicant.phones[j].number.trim().length > 0
    }
  }
  return (isValidName && isValidDLState && isValidPhone)
}

export const isResidenceReadyForSubmit = (residence) => {
  if (typeof (residence) !== 'undefined' && residence) {
    return (isBoolean(residence.physical_mailing_similar) &&
(residence.residence_ownership && Object.keys(residence.residence_ownership).length) > 0 &&
isBoolean(residence.weapon_in_home) &&
isBoolean(residence.body_of_water_exist) &&
isBoolean(residence.others_using_residence_as_mailing) &&
Object.keys(residence.home_languages).length > 0)
  } else {
    return false
  }
}

export const isAddressReadyForSubmit = (address) => {
  if (typeof (address) !== 'undefined' && address) {
    return (address.street_address.trim().length > 0 &&
  address.zip.trim().length > 0 &&
  address.city.trim().length > 0 &&
  (address.state && Object.keys(address.state).length) > 0)
  } else {
    return false
  }
}

export const arrayLastToFirst = (arraytoSort) => {
  if (arraytoSort.length > 1) {
    let finalArray = Immutable.fromJS(arraytoSort).slice(0, -1).toJS()
    let lastValue = Immutable.fromJS(arraytoSort).slice(-1).toJS()
    finalArray = lastValue.concat(finalArray)
    return finalArray
  } else {
    return arraytoSort
  }
}
