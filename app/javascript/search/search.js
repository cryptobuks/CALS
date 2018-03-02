import React from 'react'
import SearchGrid from './search_grid'
import SearchInput from './search_input'
import SearchList from './search_list'
import SearchNotFound from './search_notfount'
import SearchDetails from './search_Data'
import {fetchRequest} from '../helpers/http'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      landingPageUrl: props.landingUrl,
      isToggled: true,
      inputData: ' ',
      searchResults: undefined,
      totalNoOfResults: 0,
      disableNext: false,
      disablePrevious: true,
      fromValue: 0,
      sizeValue: 5,
      pageNumber: 1,
      searchId: {}
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.searchApiCall = this.searchApiCall.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeToNextPage = this.changeToNextPage.bind(this)
    this.backToPreviousPage = this.backToPreviousPage.bind(this)
    this.nextPageLinkStatus = this.nextPageLinkStatus.bind(this)
    this.previousPageLinkStatus = this.previousPageLinkStatus.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (key, value) {
    let newSearchId = this.state.searchId
    newSearchId[key] = value
    this.setState({
      searchId: newSearchId
    })
  }

  handleToggle () {
    this.setState({isToggled: !this.state.isToggled})
  }

  searchApiCall (DataSearch, getFromValue, getSizeValue) {
    const query = DataSearch.split(',')

    const params = {
      'county.value': [query[0]],
      'type.value': [query[1]],
      id: [query[2]],
      name: [query[3]],
      'addresses.address.street_address': query.slice(4, (query.length))
    }

    // call http request function with arguments
    let url = '/facilities/search' + '?from=' + getFromValue + '&size=' + getSizeValue
    fetchRequest(url, 'POST', params).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        inputData: DataSearch,
        searchResults: data.facilities,
        totalNoOfResults: data.total,
        sizeValue: getSizeValue,
        disableNext: this.nextPageLinkStatus(data.total, getFromValue, getSizeValue),
        disablePrevious: this.previousPageLinkStatus(getFromValue, getSizeValue)
      })
    }).catch(error => {
      console.log(error)
      return this.setState({
        searchResults: []
      })
    })
  }

  handleChange (facilitiesPerPage) {
    this.setState({
      sizeValue: parseInt(facilitiesPerPage),
      fromValue: 0
    }, () => {
      this.searchApiCall(this.state.inputData, this.state.fromValue, this.state.sizeValue)
    })
  }

  nextPageLinkStatus (total, fromValue, sizeValue) {
    if (fromValue + sizeValue >= total || total < 5) {
      return true
    }
  }

  previousPageLinkStatus (fromValue, sizeValue) {
    if (fromValue - sizeValue < 0 || fromValue === 0) {
      this.setState({
        pageNumber: 1,
        fromValue
      })
      return true
    }
  }

  changeToNextPage (fromValue, sizeValue, pageNumber) {
    this.setState({
      fromValue: fromValue + sizeValue,
      disablePrevious: false,
      pageNumber: pageNumber + 1
    }, () => {
      this.searchApiCall(this.state.inputData, this.state.fromValue, this.state.sizeValue)
    })
  }

  backToPreviousPage (fromValue, sizeValue, pageNumber) {
    this.setState({
      fromValue: fromValue - sizeValue,
      disableNext: false,
      pageNumber: pageNumber - 1
    }, () => {
      this.searchApiCall(this.state.inputData, this.state.fromValue, this.state.sizeValue)
    })
  }

  render () {
    const initialLoad = this.state.searchResults === undefined
    const searchResponseHasValues = this.state.searchResults && this.state.searchResults.length > 0

    return (
      <div className='search_page'>
        <div className='search-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <SearchInput
            searchApiCall={this.searchApiCall}
            handleInputChange={this.handleInputChange}
            countyList={this.props.countyTypes}
            facilityTypes={this.props.facilityTypes}
            userDetails={this.props.user || undefined}
            countyValue={this.state.searchId.countyValue || this.props.user.county_name}
            facilityTypeValue={this.state.searchId.facilityTypeValue}
            facilityIdValue={this.state.searchId.facilityIdValue}
            facilityNameValue={this.state.searchId.facilityNameValue}
            facilityAddressValue={this.state.searchId.facilityAddressValue} />
        </div>
        {searchResponseHasValues &&
          <SearchDetails
            inputData={this.state.inputData}
            totalNoOfFacilities={this.state.totalNoOfResults}
            toggeledResult={this.state.isToggled}
            disablePrevious={this.state.disablePrevious}
            disableNext={this.state.disableNext}
            sizeValue={this.state.sizeValue}
            fromValue={this.state.fromValue}
            pageNumber={this.state.pageNumber}
            searchApiCall={this.searchApiCall}
            handleToggle={this.handleToggle}
            changeToNextPage={this.changeToNextPage}
            backToPreviousPage={this.backToPreviousPage}
            handleChange={this.handleChange} />}
        <div className='result-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          {this.state.isToggled && <SearchGrid searchResults={this.state.searchResults} />}
          {!this.state.isToggled && <SearchList searchResults={this.state.searchResults} />}
          {(!searchResponseHasValues && !initialLoad) && <SearchNotFound />}
        </div>
      </div>
    )
  }
}
