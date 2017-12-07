import Immutable from 'immutable'
import _ from 'lodash'
import moment from 'moment'

export default class Validator {
  constructor (validations) {
    this.validations = Immutable.fromJS(validations)
    this.errors = {}

    // all avaialble rules
    this.rules = {
      isRequired: this.isRequired,
      isRequiredIf: this.isRequiredIf,
      isNotInTheFuture: this.isNotInTheFuture,
      isBeforeOtherDate: this.isBeforeOtherDate,
      is10digits: this.is10digits,
      isValidDate: this.isValidDate
    }
  }

  // add new validation rule
  addNewValidation (validation) {
    this.validations = this.validations.merge(validation)
  }

  // add new validation rule by field name
  addFieldValidation (fieldName, validation) {
    let currentRules = this.validations.get(fieldName) || Immutable.fromJS([])

    // get list of validations minus the rule we are tryingt to add
    // this is done to avoid having multiple rules of same type
    let newRules = currentRules.filter(x => x.rule !== validation.rule)

    // add incoming rule
    newRules = newRules.push(Immutable.fromJS(validation))

    this.validations = this.validations.merge({[fieldName]: newRules})
  }

  allFieldErrorsByRule (rule) {
    let errors = {}
    let filteredRules = this.allValidationsWithOnlyRule(rule)

    filteredRules.map((fieldRules, fieldName) => {
      if (this.fieldErrors(fieldName).size > 0) { errors[fieldName] = this.fieldErrors(fieldName) }
    })

    return Immutable.fromJS(errors)
  }

  allFieldsErrors (container) {
    let errors = {}
    if (container) {
      container.forEach((fieldName) => {
        errors[fieldName] = this.fieldErrors(fieldName)
      })
    } else {
      errors = this.errors
    }
    return Immutable.fromJS(errors)
  }

  fieldErrors (fieldName) {
    return Immutable.Set(this.errors[fieldName] || [])
  }

  isRequired (opt) {
    return !(_.isEmpty(opt.value) || _.isEmpty(opt.value.trim()))
  }

  isRequiredIf (opt) {
    if (opt.condition()) {
      return !(_.isEmpty(opt.value) || (typeof (opt) === 'string' && _.isEmpty(opt.value.trim())))
    }
    return true
  }

  isNotInTheFuture ({value}) {
    return !(value > moment().toISOString())
  }

  isBeforeOtherDate ({value, otherValue}) {
    return !(value && otherValue() && value >= otherValue())
  }

  is10digits (opt) {
    return (opt.value.length === 10) || (opt.value.length === 0)
  }

  isValidDate (opt) {
    return (moment(opt.value, 'MM/DD/YYYY', true).isValid() || (_.isEmpty(opt.value) || _.isEmpty(opt.value.trim())))
  }
  // Filter field validations containing given ruleName
  // return all validations for that field
  // if a field has multiple rules, all rules are returned
  // alternate function names
  // getAllValidationsByRule
  // filterFieldValidationsAllRules
  allValidationsWithRule (ruleName) {
  // get all validation rule that matches with rule name
    return this.validations.filter(fieldValidations => (
      fieldValidations.find(validationRule => validationRule.get('rule') === ruleName)
    ) !== undefined)
  }

  // Filter field validations containing given ruleName
  // return only rules matching ruleName
  // alternate function names
  // getValidationsByRule
  // filterFieldValidationsContainingRule
  allValidationsWithOnlyRule (ruleName) {
    return this.validations.map(fieldValidations => (
      fieldValidations.filter(validationRule => validationRule.get('rule') === ruleName)
    )).filter(rules =>
      // remove empty validations
      rules.size > 0
    )
  }

  allIsRequiredRules () {
    return this.allValidationsWithOnlyRule('isRequired')
  }

  validateFieldAndGetError (fieldName, value) {
    let error
    const fieldValidations = this.validations.get(fieldName)
    if (fieldValidations) {
      fieldValidations.map((ruleOptions) => {
        const opts = {
          value: value,
          ruleName: ruleOptions.get('rule'),
          errorMessage: ruleOptions.get('message'),
          condition: ruleOptions.get('condition'),
          otherValue: ruleOptions.get('otherValue')
        }

        if (this.rules[opts.ruleName](opts)) {
          // return undefined
        } else {
          error = opts.errorMessage
        }
      })
    }
    return error
  }

  validateField (fieldName, value) {
    const fieldValidations = this.validations.get(fieldName)
    if (fieldValidations) {
      fieldValidations.map((ruleOptions) => {
        const opts = {
          value: value,
          ruleName: ruleOptions.get('rule'),
          errorMessage: ruleOptions.get('message'),
          condition: ruleOptions.get('condition'),
          otherValue: ruleOptions.get('otherValue')
        }

        this.errors[fieldName] = this.errors[fieldName] || new Set()
        if (this.rules[opts.ruleName](opts)) {
          this.errors[fieldName].delete(opts.errorMessage)
        } else {
          this.errors[fieldName].add(opts.errorMessage)
        }
      })
    }
  }

  validateAllRequired (data) {
    let requiredRules = this.allIsRequiredRules()
    requiredRules.map((fieldRules, fieldName) => {
      const fieldValue = _.get(data, fieldName)
      this.validateField(fieldName, fieldValue)
    })
  }

  validateAll (data) {
    // validate all fields
    this.validations.map((fieldRules, fieldName) => {
      const fieldValue = _.get(data, fieldName)
      this.validateField(fieldName, fieldValue)
    })

    //  validate all sub validators
    this.validators.map(v => {
      console.log(v.datakey)
      v.validateAll(immutableData.get(v.dataKey))
    })
  }

  validateAllFields (container) {
    if (container) {
      Object.entries(container).forEach(([fieldName, value]) => {
        this.validateField(fieldName, value)
      })
    }
  }
}
