require 'rails_helper'
require 'vcr'

RSpec.feature 'Facilities', js: true, set_auth_header: true  do
  before(:each) do
    allow_any_instance_of(SearchController).to receive(:user_from_session).and_return(FactoryGirl.build(:user))
    allow_any_instance_of(FacilitiesController).to receive(:store_in_session).and_return(true)
    #allow_any_instance_of(FacilitiesController).to receive(:store_facility_response_in_session).and_return(true)
  end

  scenario 'List of facilities from search results' do
    facilities_list
  end

  scenario 'click facility from list of facilities search results' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Lederhouse Transitions')
  end

  scenario 'Click toggle result and validate facility name in list view' do
    facilities_list
    within(:css, '.toggle_result') do
      page.find(:css,'.line_off-icon.navbar-brand').click
    end
    expect(page).to have_text('Lederhouse Transitions')
  end

  scenario 'refresh facility' do
    facilities_list
    click_link('Lederhouse Transitions')
    page.evaluate_script('window.location.reload()')
    expect(page).to have_text('Lederhouse Transitions')
  end

  scenario 'click into facility and show complaints' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Approved')
  end

  scenario 'click into facility and validate children section' do
    facilities_list
    click_link('Lederhouse Transitions')
    expect(page).to have_text('Takahashi')
    expect(page).to have_xpath('//tbody/tr[1]/td[4]', :text => 'F')
  end

  scenario 'select county dropdown and show search results' do
    visit search_index_path
    select 'Alameda', from: 'county_select'
    find_button('search').click
    expect(page).to have_text('DONALD DUCK ARF')
  end

  scenario 'select facility type dropdown and show search results' do
    visit search_index_path
    select "Orange", :from => "county_select"
    select 'Adoption Agency', from: 'facility_select'
    find_button('search').click
    expect(page).to have_text('Open Door Adoption')
  end

  scenario 'find facilties by entering facility ID' do
    visit search_index_path
    select "Los Angeles", :from => "county_select"
    fill_in 'Enter Facility ID #', with: '198798943'
    find_button('search').click
    expect(page).to have_text('Altadena Youth Shelter')
  end

  scenario 'find facilties by entering facility ID with alpha characters' do
    visit search_index_path
    select "Sacramento", :from => "county_select"
    fill_in 'Enter Facility ID #', with: 'DL7oFNL0AB'
    find_button('search').click
    expect(page).to have_text('Sandy Beach Foster Care Home')
  end

  # scenario 'test pagination and back button' do
  #   visit search_index_path
  #   find_button('search').click
  #   expect(find_field('dropdownFacilities').value).to eq '5'
  #   expect(page).to have_css(:span, text: '1')
  #   expect(page).to have_css(:span, text: '696')
  #   expect(page).to have_text('Ricardo, Cecilio & Tessie')
  #   click_link('Ricardo, Cecilio & Tessie')
  #   click_button('Back')
  #   expect(find_field('dropdownFacilities').value).to eq '5'
  #   expect(page).to have_css(:span, text: '1')
  #   expect(page).to have_css(:span, text: '696')
  #   expect(page).to have_text('Ricardo, Cecilio & Tessie')
  # end



  def facilities_list
    visit search_index_path
    #select "Orange", :from => "county_select"
    fill_in 'Enter Facility Name', with: 'Lederhouse Transitions'
    find_button('search').click
    expect(page).to have_text('Lederhouse Transitions')
  end
end
