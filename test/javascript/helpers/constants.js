const stateTypes = Object.freeze({
  items: [
    {
      'value': 'Alaska',
      'id': 'AK'
    },
    {
      'value': 'Alabama',
      'id': 'AL'
    },
    {
      'value': 'American Samoa',
      'id': 'AM'
    },
    {
      'value': 'Arkansas',
      'id': 'AR'
    },
    {
      'value': 'Arizona',
      'id': 'AZ'
    },
    {
      'value': 'California',
      'id': 'CA'
    },
    {
      'value': 'Northern Marianas Islands',
      'id': 'CM'
    },
    {
      'value': 'Colorado',
      'id': 'CO'
    },
    {
      'value': 'Connecticut',
      'id': 'CT'
    },
    {
      'value': 'Canal Zone',
      'id': 'CZ'
    },
    {
      'value': 'District of Columbia',
      'id': 'DC'
    },
    {
      'value': 'Delaware',
      'id': 'DE'
    },
    {
      'value': 'Florida',
      'id': 'FL'
    },
    {
      'value': 'Georgia',
      'id': 'GA'
    },
    {
      'value': 'Guam',
      'id': 'GU'
    },
    {
      'value': 'Hawaii',
      'id': 'HI'
    },
    {
      'value': 'Iowa',
      'id': 'IA'
    },
    {
      'value': 'Idaho',
      'id': 'ID'
    },
    {
      'value': 'Illinois',
      'id': 'IL'
    },
    {
      'value': 'Indiana',
      'id': 'IN'
    },
    {
      'value': 'Kansas',
      'id': 'KS'
    },
    {
      'value': 'Kentucky',
      'id': 'KY'
    },
    {
      'value': 'Louisiana',
      'id': 'LA'
    },
    {
      'value': 'Massachusetts',
      'id': 'MA'
    },
    {
      'value': 'Maryland',
      'id': 'MD'
    },
    {
      'value': 'Maine',
      'id': 'ME'
    },
    {
      'value': 'Michigan',
      'id': 'MI'
    },
    {
      'value': 'Minnesota',
      'id': 'MN'
    },
    {
      'value': 'Missouri',
      'id': 'MO'
    },
    {
      'value': 'Mississippi',
      'id': 'MS'
    },
    {
      'value': 'Montana',
      'id': 'MT'
    },
    {
      'value': 'North Carolina',
      'id': 'NC'
    },
    {
      'value': 'North Dakota',
      'id': 'ND'
    },
    {
      'value': 'Nebraska',
      'id': 'NE'
    },
    {
      'value': 'New Hampshire',
      'id': 'NH'
    },
    {
      'value': 'New Jersey',
      'id': 'NJ'
    },
    {
      'value': 'New Mexico',
      'id': 'NM'
    },
    {
      'value': 'Nevada',
      'id': 'NV'
    },
    {
      'value': 'New York',
      'id': 'NY'
    },
    {
      'value': 'Ohio',
      'id': 'OH'
    },
    {
      'value': 'Oklahoma',
      'id': 'OK'
    },
    {
      'value': 'Oregon',
      'id': 'OR'
    },
    {
      'value': 'Pennsylvania',
      'id': 'PA'
    },
    {
      'value': 'Puerto Rico',
      'id': 'PR'
    },
    {
      'value': 'Rhode Island',
      'id': 'RI'
    },
    {
      'value': 'South Carolina',
      'id': 'SC'
    },
    {
      'value': 'South Dakota',
      'id': 'SD'
    },
    {
      'value': 'Tennessee',
      'id': 'TN'
    },
    {
      'value': 'Trust Territories',
      'id': 'TT'
    },
    {
      'value': 'Texas',
      'id': 'TX'
    },
    {
      'value': 'Utah',
      'id': 'UT'
    },
    {
      'value': 'Virginia',
      'id': 'VA'
    },
    {
      'value': 'Virgin Islands',
      'id': 'VI'
    },
    {
      'value': 'Vermont',
      'id': 'VT'
    },
    {
      'value': 'Washington',
      'id': 'WA'
    },
    {
      'value': 'Wisconsin',
      'id': 'WI'
    },
    {
      'value': 'West Virginia',
      'id': 'WV'
    },
    {
      'value': 'Wyoming',
      'id': 'WY'
    }
  ]}
)

const selectedYes = Object.freeze({
  target: {
    options: {
      '1': {
        value: '1',
        'text': 'No'
      },
      '2': {
        value: '2',
        text: 'Yes'
      },
      selectedIndex: 2
    }
  }

}
)

const salaryTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'yearly'
    },
    {
      'id': 2,
      'value': 'monthly'
    },
    {
      'id': 3,
      'value': 'hourly'
    }
  ]
}
)

const languageTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'English'
    }
  ]}
)

const residenceTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Own'
    }
  ]}
)

const educationLevels = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'High School'
    },
    {
      'id': 2,
      'value': 'GED'
    },
    {
      'id': 3,
      'value': 'Some College'
    },
    {
      'id': 4,
      'value': 'College - Bachelors'
    },
    {
      'id': 5,
      'value': 'College - Masters'
    },
    {
      'id': 6,
      'value': 'College - PhD'
    },
    {
      'id': 7,
      'value': 'Medical School'
    }
  ]}
)

const genderTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Male'
    },
    {
      'id': 2,
      'value': 'Female'
    }
  ]}
)

const schoolGrades = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'TK'
    }
  ]}
)

const ethnicityTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Asian'
    }
  ]}
)
const nameTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Alias'
    },
    {
      'id': 2,
      'value': 'Legal'
    }
  ]}
)
const relationshipTypes = Object.freeze(
  [
    {
      'id': 1,
      'value': 'Sibling'
    },
    {
      'id': 2,
      'value': 'Neice'
    }
  ]
)
const applicantrelationTypes = Object.freeze(
  [
    {
      'id': 1,
      'value': 'Married'
    },
    {
      'id': 2,
      'value': 'Cohabitants'
    }
  ]
)
const suffixTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Esq'
    },
    {
      'id': 2,
      'value': 'II'
    }
  ]
})
const prefixTypes = Object.freeze({
  'items': [
    {
      'id': 4,
      'value': 'Dr.'
    },
    {
      'id': 5,
      'value': 'Miss'
    }
  ]
})
const ageGroups = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': '0-3 years'
    },
    {
      'id': 2,
      'value': '4-8 years'
    },
    {
      'id': 3,
      'value': '9-12 years'
    },
    {
      'id': 4,
      'value': '13-15 years'
    },
    {
      'id': 5,
      'value': '16-18 years'
    },
    {
      'id': 6,
      'value': '18-21 years'
    },
    {
      'id': 7,
      'value': 'No preference'
    }
  ]
})
const siblingGroups = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': '0'
    },
    {
      'id': 2,
      'value': '2'
    },
    {
      'id': 3,
      'value': '3'
    },
    {
      'id': 4,
      'value': '4'
    },
    {
      'id': 5,
      'value': '5+'
    }
  ]
})

export const licenseTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Approval'
    }
  ]}
)

export const yesNo = Object.freeze({
  'items': [
    {
      'id': true,
      'value': 'Yes'
    },
    {
      'id': false,
      'value': 'No'
    }]}
)

export const phoneTypes = Object.freeze(
  [
    {
      'id': 1,
      'value': 'Cell'
    },
    {
      'id': 2,
      'value': 'Mobile'
    }
  ]
)

const marriageTerminationReasons = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Marriage Dissolution (Divorce)'
    },
    {
      'id': 2,
      'value': 'Spouse Died'
    }
  ]
})

const relationshipToApplicantTypes = Object.freeze({
  'items': [
    {
      'id': 1,
      'value': 'Child'
    },
    {
      'id': 2,
      'value': 'Sibling'
    },
    {
      'id': 3,
      'value': 'Cousin'
    },
    {
      'id': 4,
      'value': 'Niece'
    },
    {
      'id': 5,
      'value': 'Nephew'
    }
  ]
})
const countyTypes = Object.freeze({
  'items': [
    {
      'value': 'Alameda',
      'id': 1
    },
    {
      'value': 'Alpine',
      'id': 2
    },
    {
      'value': 'Amador',
      'id': 3
    },
    {
      'value': 'Butte',
      'id': 4
    },
    {
      'value': 'Calaveras',
      'id': 5
    }]})
export {siblingGroups, ageGroups, marriageTerminationReasons, relationshipToApplicantTypes,
  nameTypes, suffixTypes, prefixTypes, salaryTypes, relationshipTypes, applicantrelationTypes,
  educationLevels, ethnicityTypes, genderTypes, schoolGrades, stateTypes, languageTypes, residenceTypes, countyTypes, selectedYes }
