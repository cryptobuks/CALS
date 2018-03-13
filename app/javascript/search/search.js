import React from 'react'
import SearchGrid from './search_grid'
import SearchInput from './search_input'
import SearchList from './search_list'
import SearchNotFound from './search_notfount'
import SearchDetails from './search_Data'
import {fetchRequest} from '../helpers/http'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'
import {checkforNull} from 'search/common/commonUtils'
// import {bindActionCreators} from 'redux'
import {addValue} from 'actions/search_action'
import {connect} from 'react-redux'
import {checkForValue} from 'search/common/commonUtils'
import {getFromValue} from 'helpers/commonHelper.jsx'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggled: true,
      searchResults: undefined,
      // inputData: props.inputData,
      totalNoOfResults: 0,
      searchResults: undefined,
      pageNumber: props.pageNumber,
      sizeValue: props.size
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.searchApiCall = this.searchApiCall.bind(this)
    this.changePage = this.changePage.bind(this)
    this.removeCriteria = this.removeCriteria.bind(this)
  }

  removeCriteria (value) {
    this.handleInputChange(value, '')
    this.searchApiCall(0, this.state.sizeValue)
  }

  handleToggle () {
    this.setState({isToggled: !this.state.isToggled})
  }

  searchApiCall (getFromValue, getSizeValue) {
    const params = {
      'county.value': this.props.inputData.countyValue || this.props.user.county_name,
      'type.value': checkForValue(this.props.inputData.facilityTypeValue),
      id: checkForValue(this.props.inputData.facilityIdValue),
      name: checkForValue(this.props.inputData.facilityNameValue),
      'addresses.address.street_address': checkForValue(this.props.inputData.facilityAddressValue)
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
        pageNumber: getFromValue === 0 ? 1 : this.state.pageNumber
      })
    }).catch(error => {
      console.log(error)
      return this.setState({
        searchResults: []
      })
    })
  }

  componentDidMount () {
    if (Object.keys(this.props.inputData).length !== 0) {
      const fromValue = getFromValue(this.state.sizeValue, this.state.pageNumber)
      this.searchApiCall(fromValue, this.state.sizeValue)
    }
  }

  changePage (pageNumber) {
    const fromValue = getFromValue(this.state.sizeValue, pageNumber)
    this.setState({
      pageNumber: pageNumber}, () => {
      this.searchApiCall(fromValue, this.state.sizeValue)
    })
  }

  render () {
    console.log(this.props.inputData)
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
            countyValue={this.props.inputData.countyValue || this.props.user.county_name}
            facilityTypeValue={this.props.inputData.facilityTypeValue}
            facilityIdValue={this.props.inputData.facilityIdValue}
            facilityNameValue={this.props.inputData.facilityNameValue}
            facilityAddressValue={this.props.inputData.facilityAddressValue}
            addValue={this.props.addValue}
          />
        </div>
        {searchResponseHasValues &&
          <SearchDetails
            inputData={this.props.inputData}
            totalNoOfFacilities={this.state.totalNoOfResults}
            toggeledResult={this.state.isToggled}
            sizeValue={this.state.sizeValue}
            pageNumber={this.state.pageNumber}
            searchApiCall={this.searchApiCall}
            handleToggle={this.handleToggle}
            changePage={this.changePage}
            handleInputChange={this.handleInputChange}
            removeCriteria={this.removeCriteria} />}
        <div className='result-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          {this.state.isToggled && <SearchGrid searchResults={this.state.searchResults} />}
          {!this.state.isToggled && <SearchList searchResults={this.state.searchResults} />}
          {(!searchResponseHasValues && !initialLoad) && <SearchNotFound />}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    inputData: state.searchReducer.inputData
  }
}
// function mapDispatchToProps (dispatch) {
//   return bindActionCreators({addValue}, dispatch)
// }
export default connect(mapStateToProps, {addValue})(Search)
