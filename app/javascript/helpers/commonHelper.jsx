export const valuePresent = (val) => {
  return (val !== null) && (val !== undefined)
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
export const FormatDateForPersistance = (dateString) => {
  let persistantDateString
  if (dateString) {
    persistantDateString = SplitDate(dateString, '/', '-')
  } else {
    dateString = ''
  }
  return persistantDateString || dateString.replace(/\//gi, '-')
}

export const FormatDateForDisplay = (dateStringDisplay) => {
  let persistantDateString
  if (dateStringDisplay) {
    persistantDateString = SplitDate(dateStringDisplay, '-', '/')
  } else {
    dateStringDisplay = ''
  }
  return persistantDateString || dateStringDisplay.replace(/-/gi, '/')
}

export const SplitDate = (dateStringToSplit, splitChar, joinChar) => {
  let persistantDateString
  if (dateStringToSplit.length === 10) {
    const dateStringArray = dateStringToSplit ? dateStringToSplit.split(splitChar, 3) : []
    persistantDateString = ([dateStringArray[2], dateStringArray[1], dateStringArray[0]]).join(joinChar)
  }
  return persistantDateString
}

export const findArrayValueByMethod = (arrayToBeFiltered, method, findByType, comparedWith) => {
  return arrayToBeFiltered[method](obj => {
    return obj.get(findByType.toString()) === comparedWith
  })
}
// export const filterArrayValueByMethod = (arrayToBeFiltered, method, id) => {
//   return arrayToBeFiltered[method](obj => {
//     return obj.get('id') !== id
//   })
// }
