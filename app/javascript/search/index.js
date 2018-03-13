import React, { Component } from 'react'
import Search from './search'
import {store} from 'store/configureStore'
import { Provider } from 'react-redux'
import './stylesheets/search.scss'

export default class SearchMain extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Search {...this.props} />
      </Provider>
    )
  }
}
