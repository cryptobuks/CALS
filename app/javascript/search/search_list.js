import React from 'react'

export default class SearchList extends React.Component {
  render () {
    const searchResult = this.props.searchResults
    const resultTable = searchResult.map((result) => {
      let displayAddress = result.addresses[0] !== undefined && result.addresses[0].address.street_address !== undefined
      let address = displayAddress ? result.addresses[0].address.street_address + ',' + result.addresses[0].address.city
        + ',' + result.addresses[0].address.state + ' ' + result.addresses[0].address.zip_code : 'N/A'
      let phone = (result.phones[0] !== undefined &&  result.phones[0].number !== undefined) ? result.phones[0].number : 'N/A'

      return (
        <tr key={result.license_number}>
          <td><a href={'/facilities/' + result.license_number}>{result.name}</a></td>
          <td>{result.license_number}</td>
          <td>{result.type.value}</td>
          <td>{result.status.value}</td>
          <td>{result.name}</td>
          <td>{address}</td>
          <td>{result.county.value}</td>
          <td>{phone}</td>
          <td>{result.email_address ? result.email_address : 'N/A'}</td>
          <td>{result.assigned_worker.value ? result.assigned_worker.value : 'N/A'
          }<p>Phone: <span>{phone}</span></p></td>
        </tr>
      )
    })
    return (
      <div className='main_table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Facility Name </th>
              <th>Facility license/ Approval #</th>
              <th>Facility Type</th>
              <th>Status</th>
              <th>Licensee Name</th>
              <th>Facility Address</th>
              <th>County</th>
              <th>Phone Number</th>
              <th>Facility Email</th>
              <th>Assigned Worker</th>
            </tr>
          </thead>
          <tbody>
            {resultTable}
          </tbody>
        </table>
      </div>
    )
  }
}