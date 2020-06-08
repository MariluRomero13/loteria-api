'use strict'
const { formatters } = use('Validator')

class VerifyLink {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      link: 'required|max:30|min:30'
    }
  }
}

module.exports = VerifyLink
