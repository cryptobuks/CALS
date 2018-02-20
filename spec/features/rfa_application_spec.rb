require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA', js: true do

  scenario 'Dashboard page', set_auth_header: true do
    visit root_path
    expect(page).to have_button('Create RFA Application (Form 01)')
  end

  scenario 'validate applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
  end

  scenario 'validate full applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    fill_in 'applicants[0].driver_license_number', with: 'ABC123'
    # fill_in('first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    # fill_in('middle_name', with: 'k', :match => :prefer_exact)
    # fill_in('last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    expect(page).to have_content 'More About Applicant'
    select 'Some High School', from: 'highest_education_level'
    select 'Black', from: 'ethnicity'
    select 'Alaska', from: 'applicants[0].driver_license_state'
    fill_in('Email Address (optional)', with: 'test@test.com', :match => :prefer_exact)
    expect(page).to have_content 'Employment'
    fill_in('Name of the Employer', with: 'Employer Name', :match => :prefer_exact)
    fill_in('Occupation', with: 'Front End Developer', :match => :prefer_exact)
    fill_in('income', with: '10', :match => :prefer_exact)
    fill_in('street_address', with: '2870 Gateway', :match => :prefer_exact)
    fill_in('Zip', with: '94403', :match => :prefer_exact)
    fill_in('City', with: 'Sacremento', :match => :prefer_exact)
    expect(page).to have_content 'Phone Number'
    fill_in 'applicants[0].phones[0].number', with: '201-222-2345'
    click_button('Save Progress')
    visit page.driver.current_url
    expect(find_field('highest_education_level').value).to eq '2'
    expect(find_field('ethnicity').value).to eq '4'
    expect(find_field('applicants[0].driver_license_number').value).to eq 'ABC123'
    expect(find_field('applicants[0].driver_license_state').value).to eq 'AK'
    expect(find_field('employer_name').value).to eq 'Employer Name'
    expect(find_field('occupation').value).to eq 'Front End Developer'
    expect(find_field('income').value).to eq '$10'
    expect(find_field('income_type').value).to eq '1'
    expect(find_field('applicants[0].phones[0].number').value).to eq '(201) 222-2345'
  end

  scenario 'prevent backspace navigation on IE', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    select "Mr.", :from => "name_prefix", :match => :first
    page.first('select#name_prefix').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in "applicants[0].phones[0].number", with: "\t"
    page.first('select#phone_type').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
    find('#addAnotherNumber').send_keys :tab
    find('#addAnotherApplicant').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
  end

  scenario 'validate dropdown focus select on Phone Card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in "applicants[0].phones[0].number", with: "\t"
    expect(page).to have_selector(:css, "select:focus")
  end

  scenario 'validate Relationship between Applicant', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    click_button('Add Another Applicant +')
    fill_in('applicants[1].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[1].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    select 'Married', from: 'relationship_type'
    select 'Alaska', from: 'place_of_relationship_state'
    click_button('Save Progress')
    expect(find_field('relationship_type').value).to eq '1'
    visit page.driver.current_url
    expect(find_field('relationship_type').value).to eq '1'
    expect(find_field('place_of_relationship_state').value).to eq 'AK'
  end

  scenario 'validate Residence card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    expect(page).to have_content 'IV. Minor Children Residing in the Home'
    fill_in('street_address', with: '2870 something else', :match => :prefer_exact)
    fill_in('Zip', with: '12345', :match => :prefer_exact)
    find('#mailing_similarYes').click
    fill_in('street_address', with: 'maing address here', :match => :prefer_exact)
    fill_in('zip', with: '12345', :match => :prefer_exact)
    fill_in('city', with: 'secondary city', :match => :prefer_exact)
    expect(page).to have_content 'About This Residence'
    select 'Own', from: 'residenceTypes'
    find('#weaponsYes').click

    find('#body_of_water_existYes').click
    find('#others_using_residence_as_mailingYes').click
    fill_in('directions', with: 'directions goes here', :match => :prefer_exact)
    page.find(:css, '.languages').click
    page.find(:css, "#react-select-5--option-0").click
    page.find(:css, '.languages').click
    page.find(:css, "#react-select-5--option-1").click
    expect(page).to have_css(:span, text: 'American Sign Language')
    expect(page).to have_css(:span, text: 'Armenian')
    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('residenceTypes').value).to eq '1'
    expect(find_field('mailing_similartrue').value).to eq 'true'
    expect(find_field('weaponstrue').value).to eq 'true'
    expect(find_field('body_of_water_existtrue').value).to eq 'true'
    expect(find_field('others_using_residence_as_mailingtrue').value).to eq 'true'
  end

  scenario 'validate Minor Children card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click

    expect(page).to have_content 'Applicant 1 - Information'
    applicant_1_first_name = Faker::Name.first_name
    applicant_1_last_name  = Faker::Name.last_name
    applicant_1_full_name  = applicant_1_first_name + ' ' + 'k' + ' ' + applicant_1_last_name
    fill_in('applicants[0].first_name', with: applicant_1_first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: applicant_1_last_name, :match => :prefer_exact)
    expect(page).to have_content 'IV. Minor Children Residing in the Home'
    select 'Child', from: 'relationship_to_applicant'
    select applicant_1_full_name, from: 'applicant_id'
    select 'Yes', from: 'child_financially_supported'
    select 'Yes', from: 'child_adopted'
    select 'Male', from: 'minor_gender'
    click_button('Save Progress')
    visit page.driver.current_url
    expect(find(:select, 'relationship_to_applicant').value).to eq '1'
    applicant_id_value = find(:select, 'applicant_id').value
    expect(find_field('applicant_id').value).to eq applicant_id_value
  end

  scenario 'validate Other Adults card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    applicant_1_first_name = Faker::Name.first_name
    applicant_1_last_name  = Faker::Name.last_name
    applicant_1_full_name  = applicant_1_first_name + ' ' + 'k' + ' ' + applicant_1_last_name
    fill_in('applicants[0].first_name', with: applicant_1_first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: applicant_1_last_name, :match => :prefer_exact)
    select applicant_1_full_name, from: 'otherAdults[0].availableApplicants'
    expect(page).to have_content 'V.Other Adults Residing or Regularly Present in the Home'
    select 'Child', from: 'otherAdults[0].relationshipType'
    fill_in('otherAdults[0].firstName', with: Faker::Name.first_name, :match => :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('otherAdults[0].relationshipType').value).to eq '1'
    availableApplicantId = find_field('otherAdults[0].availableApplicants').value
    expect(find_field('otherAdults[0].availableApplicants').value).to eq availableApplicantId
  end


  scenario 'validate Foster Care card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    expect(page).to have_content 'VIII. Foster Care / Adoption / Licensure History'
    find('#q1-select-dropdownYes').click

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('q1-select-dropdowntrue').value).to eq 'true'
  end

  scenario 'validate references card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, :match => :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', :match => :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, :match => :prefer_exact)
    expect(page).to have_content 'IX. References'
    fill_in('first_name', with: 'Sam', :match => :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url
  end

  scenario 'RFA page dictionaries', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_select('minor_gender', :with_options => ['', 'Male', 'Female'])
    expect(page).to have_select('otherAdults[0].relationshipType', :with_options => ['', 'Child', 'Sibling','Cousin', 'Niece', 'Nephew'])
    expect(page).to have_select('residenceTypes', :with_options => ['Own', 'Rent', 'Lease'])
  end
end
