import 'whatwg-fetch'
import {urlPrefixHelper} from './url_prefix_helper.js.erb'

export const getCsrfToken = function getCsrfToken (value) {
  var metas = document.getElementsByTagName('meta')
  return metas[value] ? metas[value].content : ''
}

const myHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-CSRF-Token': getCsrfToken('csrf-token'),
  'X-CSRF-param': getCsrfToken('csrf-param')
}
export const getMethod = (url, method, query) => {
  let data = {
    method: method,
    headers: myHeaders,
    mode: 'no-cors',
    credentials: 'same-origin'
  }
  return fetch(url, data)
}
export const fetchRequest = (urlFromComponent, method, params, headerParams) => {
  let url = urlPrefixHelper(urlFromComponent)
  return fetch(url, {
    method: method,
    headers: myHeaders,
    credentials: 'same-origin',
    body: JSON.stringify(params)
  })
}
