/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import './polyfills'
import React from 'react'

console.log('Hello World from CALS')
// Support component names relative to this directory:
var componentRequireContext = require.context('.', true)
var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.useContext(componentRequireContext)

// Preventing event default on backspace navigation on IE
document.addEventListener('keydown', keyDownSelect)

function keyDownSelect (e) {
  let keyCode = e.which
  if ((document.activeElement === document.body ||
      document.activeElement.tagName === 'SELECT' ||
      document.activeElement.tagName === 'BUTTON' ||
      document.activeElement.tagName === 'A' ||
      document.activeElement.type === 'radio' ||
      document.activeElement.type === 'checkbox') &&
     (document.activeElement.type !== 'text' ||
      document.activeElement.type !== 'textarea')
  ) {
    if (e.keyCode === 8) {
      e.preventDefault()
    }
  }
}
