import React from 'react'
import SearchGrid from './search_grid'
import SearchInput from './search_input'
import SearchList from './search_list'
import SearchNotFound from './search_notfount'
import SearchDetails from './search_Data'
import {fetchRequest} from '../helpers/http'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'
import {checkforNull} from 'search/common/commonUtils'

export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggled: true,
      inputData: props.inputData,
      totalNoOfResults: 0,
      searchResults: undefined,
      pageNumber: props.pageNumber,
      disableNext: this.nextPageLinkStatus(props.total, props.from, props.size),
      disablePrevious: undefined,
      fromValue: props.from,
      sizeValue: props.size
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
    let newInputData = this.state.inputData
    newInputData[key] = value
    this.setState({
      inputData: newInputData
    })
  }

  handleToggle () {
    this.setState({isToggled: !this.state.isToggled})
  }

  searchApiCall (getFromValue, getSizeValue) {
    const params = {
      'county.value': this.state.inputData.countyValue || this.props.user.county_name,
      'type.value': this.state.inputData.facilityTypeValue,
      id: this.state.inputData.facilityIdValue,
      name: this.state.inputData.facilityNameValue,
      'addresses.address.street_address': this.state.inputData.facilityAddressValue
    }

    // call http request function with arguments
    let url = '/facilities/search' + '?from=' + getFromValue + '&size=' + getSizeValue + '&pageNumber=' + this.state.pageNumber
    fetchRequest(url, 'POST', params).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        searchResults: data.facilities,
        totalNoOfResults: data.total,
        sizeValue: getSizeValue,
        // pageNumber: getFromValue === 0 ? 1 : this.state.pageNumber,
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

  componentDidMount () {
    this.previousPageLinkStatus(this.state.fromValue, this.state.sizeValue)
    if (Object.keys(this.state.inputData).length !== 0) {
      this.searchApiCall(this.state.fromValue, this.state.sizeValue)
    }
  }

  handleChange (facilitiesPerPage) {
    this.setState({
      sizeValue: parseInt(facilitiesPerPage),
      fromValue: 0,
      pageNumber: 1
    }, () => {
      this.searchApiCall(this.state.fromValue, this.state.sizeValue)
    })
  }

  nextPageLinkStatus (total, fromValue, sizeValue) {
    return (fromValue + sizeValue >= total || total < 5)
  }

  previousPageLinkStatus (fromValue, sizeValue) {
    if (fromValue - sizeValue < 0 || fromValue === 0) {
      this.setState({
        pageNumber: 1,
        disablePrevious: true
      })
    }
    return (fromValue - sizeValue < 0 || fromValue === 0)
  }

  changeToNextPage (fromValue, sizeValue, pageNumber) {
    this.setState({
      fromValue: fromValue + sizeValue,
      disablePrevious: false,
      pageNumber: pageNumber + 1
    }, () => {
      this.searchApiCall(this.state.fromValue, this.state.sizeValue)
    })
  }

  backToPreviousPage (fromValue, sizeValue, pageNumber) {
    this.setState({
      fromValue: fromValue - sizeValue,
      disableNext: false,
      pageNumber: pageNumber - 1
    }, () => {
      this.searchApiCall(this.state.fromValue, this.state.sizeValue)
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
            countyValue={this.state.inputData.countyValue || this.props.user.county_name}
            facilityTypeValue={this.state.inputData.facilityTypeValue}
            facilityIdValue={this.state.inputData.facilityIdValue}
            facilityNameValue={this.state.inputData.facilityNameValue}
            facilityAddressValue={this.state.inputData.facilityAddressValue} />
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
            handleChange={this.handleChange}
            handleInputChange={this.handleInputChange} />}
        <div className='result-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          {this.state.isToggled && <SearchGrid searchResults={this.state.searchResults} />}
          {!this.state.isToggled && <SearchList searchResults={this.state.searchResults} />}
          {(!searchResponseHasValues && !initialLoad) && <SearchNotFound />}
        </div>
      </div>
    )
  }
}
