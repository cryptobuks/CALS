import React from 'react'
import {mount, shallow} from 'enzyme'
import PageHeader from 'components/common/pageHeader'
import Button from 'components/common/button'

describe('Verify Page Header rendering', function () {
  const headerLabel = 'page title'
  let headerComp = mount(<PageHeader />)

  it('verify page header render', function () {
    expect(headerComp.length).toBe(1)
  })
  it('verify button render', () => {
    const saveButton = headerComp.find('button[id="saveProgress"]')
    expect(saveButton.length).toBe(1)
    const submitButton = headerComp.find('button[id="submitApplication"]')
    expect(submitButton.length).toBe(1)
  })
})
