import React from 'react'

export const respectiveStreetAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject) {
    return addressObject.address.street_address
  } else {
    return 'N/A'
  }
}

export const cityStateZipOfRespectiveAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject) {
    return addressObject.address.city + ',' + ' ' + addressObject.address.state + ' ' + addressObject.address.zip_code
  } else {
    return 'N/A'
  }
}

export const respectiveNumberOrNA = (phones, phoneRelation) => {
  const phoneObject = phones && phones.find(o => o.relation === phoneRelation)
  if (phoneObject) {
    return formatPhoneNumberForDashes(phoneObject.number)
  } else {
    return 'N/A'
  }
}

export const respectiveFullAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject) {
    return fullAddressString(addressObject.address)
  } else {
    return 'N/A'
  }
}

export const fullAddressString = (address) => {
  return address.street_address + ',' + address.city + ',' + address.state + ' ' + address.zip_code
}

export const checkforDateOrNa = (date) => {
  return date ? date.split(' ')[0] : 'N/A'
}

export const formatPhoneNumberForDashes = (phone) => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
}

export const checkForNA = (object) => {
  return (object && object.value) ? object.value : 'N/A'
}

export const checkfullNameorNA = (object) => {
  return object ? fullName(object) : 'N/A'
}

export const fullName = (object) => {
  return object.first_name + ' ' + object.last_name
}

export const checkValueForNull = (value) => {
  return value == null ? 'N/A' : value
}
