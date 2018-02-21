export const disclosureDefaults = Object.freeze({
  'offense': '',
  'offense_city': '',
  'offense_date': '',
  'when_offense_happen': '',
  'offense_details': ''
})
export const addressDefaults = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: null
})

export const userDefaults = Object.freeze({
  county_name: ''
})

export const phoneDefaults = Object.freeze({
  relation: '',
  type: '',
  number: ''
})

export const facilityDataDefaults = Object.freeze({
  addresses: [addressDefaults],
  phones: [phoneDefaults]
})

export const relationshipToApplicantDefaults = Object.freeze({
  applicant_id: '',
  relationship_to_applicant: null,
  relationship_to_applicant_freeform: ''
})

export const blankIdentifiedChild = Object.freeze({
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  child_in_home: '',
  date_of_birth: '',
  gender: null,
  county_of_jurisdiction: null,
  date_of_placement: '',
  relationship_to_applicants: [relationshipToApplicantDefaults],
  school_grade: null,
  school_name: '',
  school_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null,
    type: {
      value: 'Mailing',
      id: 3
    }
  }
})

export const relationshipToAdultsDefaults = Object.freeze({
  applicant_id: '',
  relationship_to_applicant: null
})

export const adultChildrenDefaults = Object.freeze({
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  relationship_to_applicants: [
    relationshipToAdultsDefaults
  ],
  lives_in_home: '',
  address: addressDefaults
})

export const formerSpousesDefaults = Object.freeze({
  relationship_type: null,
  applicant_id: '',
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  date_of_marriage: '',
  place_of_marriage_city: '',
  place_of_marriage_state: null,
  marriage_termination_reason: null,
  date_of_marriage_end: '',
  place_of_marriage_end_city: '',
  place_of_marriage_end_state: null
})

export const applicantsHistoryDefaults = Object.freeze({
  former_spouses: [formerSpousesDefaults],
  adult_children: [adultChildrenDefaults]
})

export const blankPhysicalAddress = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: {
    id: '1',
    value: 'Residential'
  }
})

export const blankMailingAddress = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: {
    id: '3',
    value: 'Mailing'
  }
})

export const blankResidenceFields = Object.freeze({
  residence_ownership: '',
  physical_mailing_similar: '',
  weapon_in_home: '',
  body_of_water_exist: '',
  body_of_water_description: '',
  others_using_residence_as_mailing: '',
  directions_to_home: '',
  addresses: [],
  home_languages: []
})

export const blankEmploymentFields = Object.freeze({
  employer_name: '',
  occupation: '',
  income: '',
  income_type: {
    id: 1,
    value: 'yearly'
  },
  physical_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null
  }
})

export const residenceAddressValueDefaults = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: {
    id: '1',
    value: 'Residential'
  }
})

export const rfa01BapplicantDefaults = Object.freeze({
  resource_family_name: '',
  applicant_first_name: '',
  applicant_middle_name: '',
  applicant_last_name: '',
  applicant_name_suffix: null,
  applicant_name_prefix: null,
  ssn: '',
  date_of_birth: '',
  driver_license: '',
  driver_license_state: null,
  residence_address: residenceAddressValueDefaults
})

export const othersUsingAddressMailing = Object.freeze({
  first_name: '',
  middle_name: '',
  last_name: ''
})
