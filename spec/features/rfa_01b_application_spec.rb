require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01B', js: true do

  scenario 'validate rfa01b ', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    fill_in('first_name', with: first_name, :match => :prefer_exact)
    fill_in('middle_name', with: 'k', :match => :prefer_exact)
    fill_in('last_name', with: last_name, :match => :prefer_exact)
    click_button('Save Progress')
    url = URI.parse(current_url)
    packet_url = url.path.gsub('/edit', '') + '/packet'
    visit page.driver.current_url
    visit packet_url
    page.find('#Rfa01BOverview').find('a.btn.btn').click
    fill_in('NameOfResourceFamily', with: 'test', :match => :prefer_exact)
    fill_in('ssn', with: '123-45-6789' , :match => :prefer_exact)
    fill_in('driversLicenseNumberId', with: 'D123', :match => :prefer_exact)
    find(:select, 'driversLicenseStateId').first(:option, 'Alaska').select_option
    #fill_in('californiaCriminalBackgroundRadiotrue', with: 'yes', :match => :prefer_exact)
    #find(:radio, 'californiaCriminalBackgroundRadiotrue')
    #fill_in('offense', with: 'test offense', :match => :prefer_exact)
    #fill_in('offense_city', with: 'test offense city' , :match => :prefer_exact)
    #find(:select, 'offense_state').first(:option, 'Alaska').select_option
    #fill_in('offense_date', with: 'date of offense', :match => :prefer_exact)
    #fill_in('offense_details', with:'offense details' , :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url
    expect(find_field('NameOfResourceFamily').value).to eq 'test'
    expect(find_field('ssn').value).to eq '123-45-6789'
    expect(find_field('driversLicenseNumberId').value).to eq 'D123'
    #expect(find_field('convicted_in_california').value).to eq true
    #expect(find_field('offense').value).to eq 'test offense'
    #expect(find_field('offense_city').value).to eq 'test offense city'
    #expect(find_field('offense_state').value).to eq '1'
    #expect(find_field('offense_date').value).to eq 'date of offense'
    #expect(find_field('offense_details').value).to eq 'offense details'
  end
end
