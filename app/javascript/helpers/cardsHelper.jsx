import Immutable from 'immutable'
import {checkArrayObjectPresence} from './commonHelper'

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
    // TODO: add check for validations
  return validationResult
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
