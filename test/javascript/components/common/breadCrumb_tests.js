import React from 'react'
import BreadCrumb from 'components/common/breadCrumb'
import {shallow} from 'enzyme'

describe('bread crumb rendering', () => {
  let breadCrumbComp
  it('verify breadCrumb rendering with a single node', () => {
    let props = [<a href="/search"> Facility Search</a>]
    breadCrumbComp = shallow(<BreadCrumb navigationElements={props} />)
    expect(breadCrumbComp.find('a').length).toEqual(2)
  })
  it('verify breadCrumb rendering with two nodes', () => {
    let props = [<a href="/search"> Facility Search</a>, <a href="/profile"> Facility Profile</a>]
    breadCrumbComp = shallow(<BreadCrumb navigationElements={props} />)
    expect(breadCrumbComp.find('a').length).toEqual(3)
  })
})
