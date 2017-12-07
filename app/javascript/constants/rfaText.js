const Rfa01bDisclosureInstructions = Object.freeze({
  'disclosure_instructions_start': 'If you choose YES on any of the following questions, please give details on disclosure of criminal background section, indicating the nature and circumstances of each crime, date and location in which each crime occured.',
  'disclosure_instructions_if': 'You must disclose convictions, including reckless and drunk driving convictions even if:',
  'disclosureInstructions_array': ['It happened a long time ago', 'It was only a misdemeanor;', 'You didn’t have to go to court (your attorney went for you);', 'You had no jail time or the sentence was only a fine or probation;', 'You received a certificate of rehabilitation; or', 'The conviction was later dismissed, set aside or the sentence was suspended.'],
  'disclosureInstructions_note': 'NOTE: If the criminal background check reveals any conviction(s) that you did not disclose on this form, your failure to disclose the conviction(s) may result in an exemption denial, application denial, rescission of approval, or exclusion from a resource family home.'
})

const Rfa01bPrivacyStatement = Object.freeze({
  'privacyStatememtA': 'Pursuant to the Federal Privacy Act (P .L. 93-579) and the Information Practices Act of 1977 (Civil Code Sections 1798 et seq.), notice is given for the request of the Social Security Number (SSN) on this form. The California Department of Justice uses a person\'s SSN as an identifying number. The requested SSN is voluntary. Failure to provide the SSN may delay the processing of this form and the criminal record check.',
  'privacyStatememtB': 'In order to be approved, as a Resource Family, or to reside or be present in the home of a Resource Family, the law requires that you complete a criminal background check. (Welfare and Institutions Code section 309, 361.4, and 16519.5). The licensing or approval agency will create a file concerning your criminal background check that will contain certain documents, including information that you provide. You have the right to access certain records containing your personal information maintained by the licensing or approval agency (Civil Code section 1798 et seq.). Under the California Public Records Act, the licensing or approval agency may have to provide copies of some of the records in the file to members of the public who ask for them, including newspaper and television reporters.'
})

const Rfa01bOutOfStateDisclosureCardText = Object.freeze({
  'lived5years': 'Have you ever lived in a state other than California in last 5 years?',
  'identifyStates': 'If YES, identify each state and complete a LIC 198B for each state listed'
})

const Rfa01bApplicantDetailsCardText = Object.freeze({
  'perjury': 'I declare under penalty of perjury under the laws of the State of California that I have read and understand the information contained in this afidavit and that my responses and any accompanying attachments are true and correct.'
})

const Rfa01bCaliforniaCriminalBackGroundCardText = Object.freeze({
  'convicted': 'Have you ever been convicted of a crime in California?',
  'marijuana': 'You need not disclose any marijuana-related offenses covered by the marijuana reform legislation codified in Health and Safety Code sections 11361.5 and 11361.7.'
})

const Rfa01bCrimeBackGroundAgainstCohabCardText = Object.freeze({
  'abuse': 'Have you ever been arrested for a crime against a child or for spousal/cohabitant abuse?'
})

const Rfa01bCriminalFieldsCardText = Object.freeze({
  'details': ' If you have been convicted of a crime in California, another state, or in federal court, provide the following information:'
})

const Rfa01bOutsideCACriminalBackgroundCardText = Object.freeze({
  'otherStateConviction': 'Have you ever been convicted of a crime in another state, federal court, military, or a jurisdiction outside of the U.S.?',
  'californiaConviction': 'Criminal convictions from another state or federal court are considered the same as criminal convictions in California.'

})

const toggleInstructionStyle = Object.freeze({
  cursor: 'pointer',
  color: 'blue',
  textDecoration: 'underline'
})

export {Rfa01bDisclosureInstructions,
  Rfa01bPrivacyStatement,
  toggleInstructionStyle,
  Rfa01bOutOfStateDisclosureCardText,
  Rfa01bApplicantDetailsCardText,
  Rfa01bCaliforniaCriminalBackGroundCardText,
  Rfa01bCrimeBackGroundAgainstCohabCardText,
  Rfa01bCriminalFieldsCardText,
  Rfa01bOutsideCACriminalBackgroundCardText}
