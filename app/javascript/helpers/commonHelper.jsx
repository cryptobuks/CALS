export const valuePresent = (val) => {
  return (val !== null) && (val !== undefined)
}

export const floatToNextInt = (val1, val2) => {
  return Math.ceil(val1 / val2)
}

export const getDictionaryId = (object) => {
  return (object && object.id) || ''
}

export const dictionaryNilSelect = (object) => {
  return dictionaryNilSelectValue(object) !== '' ? {id: dictionaryNilSelectValue(object), value: dictionaryNilSelectText(object)} : null
}

export const dictionaryNilSelectValue = (object) => {
  return object[object.selectedIndex].value
}

export const dictionaryNilSelectText = (object) => {
  return object[object.selectedIndex].text
}

export const checkArrayObjectPresence = (obj) => {
  return (obj && obj.length > 0) ? obj : null
}

export const removeLegalNameType = (nameTypes) => {
  delete nameTypes[2]
  return nameTypes
}

export const getFromValue = (pageSize, pageNumber) => {
  return pageSize * (pageNumber - 1)
}
export const FormatDateForPersistance = (dateString) => {
  let persistantDateString
  if (dateString) {
    if (dateString.length === 10) {
      const dateStringArray = dateString.split('/', 3)
      persistantDateString = ([dateStringArray[2], dateStringArray[0], dateStringArray[1]]).join('-')
    }
  } else {
    dateString = ''
  }
  return persistantDateString || dateString.replace(/\//gi, '-')
}

export const FormatDateForDisplay = (dateStringDisplay) => {
  let persistantDateString
  if (dateStringDisplay) {
    if (dateStringDisplay.length === 10) {
      const dateStringArray = dateStringDisplay.split('-', 3)
      persistantDateString = ([dateStringArray[1], dateStringArray[2], dateStringArray[0]]).join('/')
    }
  } else {
    dateStringDisplay = ''
  }
  return persistantDateString || dateStringDisplay.replace(/-/gi, '/')
}

export const findArrayValueByMethod = (arrayToBeFiltered, method, findByType, comparedWith) => {
  return arrayToBeFiltered[method](obj => {
    return obj.get(findByType.toString()) === comparedWith
  })
}

export const getCountyValue = (application, user) => {
  return getDictionaryId(application.application_county) || (user && user.county_code)
}
