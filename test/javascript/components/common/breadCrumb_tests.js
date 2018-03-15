import React from 'react'
import BreadCrumb from 'components/common/breadCrumb'
import {shallow} from 'enzyme'

describe('bread crumb rendering', () => {
  let breadCrumbComp
  it('verify breadCrumb rendering', () => {
    let props = <a href="/search"> Facility Search</a>
    breadCrumbComp = shallow(<BreadCrumb children={props} />)
    expect(breadCrumbComp.find('a').length).toEqual(2)
  })
})
