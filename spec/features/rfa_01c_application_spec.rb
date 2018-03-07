require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01C', js: true do
  scenario 'validate rfa01c', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    first_name = 'Kimberley'
    last_name = "RReily"
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)
    find('#child_identifiedYes').click
    find('#child_in_homeYes').click

    click_button('Save Progress')
    visit current_url
    expect(page.find('#edit_page > div > div > div > div.left-content.col-xs-3.col-sm-3.col-md-3.col-lg-3 > div > div.nav-menu.col-sm-10 > div > div.nav-menu > div:nth-child(3) > div > div > div > div > nav > ul > div > li > a').text).to eq('child identified')

    # packet_url = current_url.gsub('/edit', '') + '/packet'
    # visit current_url
    # visit packet_url
    # byebug
    # page.find('#Rfa01COverview').find('a.btn.btn-default').click
    click_link('child identified')
    fill_in('desiredChildCardfirst_name', with: first_name, match: :prefer_exact)
    fill_in('desiredChildCardmiddle_name', with: 'k', match: :prefer_exact)
    fill_in('desiredChildCardlast_name', with: last_name, match: :prefer_exact)
    fill_in('Residentialstreet_address', with: 'address here', match: :prefer_exact)
    fill_in('desiredChildCarddate_of_birth', with: '01/01/2000', match: :prefer_exact)
    select 'Sr', from: 'desiredChildCardname_suffix'
    select 'TK', from: 'grade'
    fill_in('Residentialzip', with: '12345', match: :prefer_exact)
    find(:css, '.Select--single').click
    find(:css, '#react-select-2--option-0').click
    select 'Male', from: 'gender'
    fill_in('name_of_school', with: 'School name', match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    expect(page).to have_css(:span, text: 'Alabama')
    expect(find_field('gender').value).to eq '1'
    expect(find_field('name_of_school').value).to eq 'School name'
    expect(find_field('Residentialzip').value).to eq '12345'
    expect(find_field('grade').value).to eq '1'
    expect(find_field('desiredChildCardname_suffix').value).to eq '6'
    expect(find_field('Residentialstreet_address').value).to eq 'address here'
    expect(find_field('desiredChildCarddate_of_birth').value).to eq '01/01/2000'
  end
end
