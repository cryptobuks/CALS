require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01B', js: true do
  scenario 'validate rfa01b creation and fields', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click
    expect(page).to have_content 'Applicant 1 - Information'
    first_name = 'Dillon'
    last_name = 'Wisozk'
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    expect(page.find('#edit_page > div > div > div > div.left-content.col-xs-3.col-sm-3.col-md-3.col-lg-3 > div > div.nav-menu.col-sm-10 > div > div.nav-menu > div:nth-child(2) > div > div > div > div > nav > ul > div > div:nth-child(1) > li > a').text).to eq("#{first_name} #{last_name}")

    click_link("#{first_name} #{last_name}")
    #byebug
    fill_in('NameOfResourceFamily', with: 'test', match: :prefer_exact)
    fill_in('ssn', with: '123-45-6789', match: :prefer_exact)
    fill_in('driversLicenseNumberId', with: 'D123', match: :prefer_exact)
    find(:select, 'driversLicenseStateId').first(:option, 'Alaska').select_option
    find('[for=californiaCriminalBackgroundRadiotrue]').click
    fill_in('californiaCriminalBackgroundoffenseReason', with: 'test offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseCity', with: 'test offense city', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundOffenseDate', with: 'date of offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseDetails', with: 'offense details', match: :prefer_exact)

    find('[for=crimeBackgroundAgainstCohabitantRadiotrue').click
    fill_in('crimeBackgroundAgainstCohabitantoffenseReason', with: 'cohab test offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseCity', with: 'cohab test offense city', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantOffenseDate', with: 'cohab date of offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseDetails', with: 'cohab offense details', match: :prefer_exact)

    find('[for=outsideCACriminalBackgroundtrue').click
    fill_in('outsideCaliforniaCriminalBackgroundoffenseReason', with: 'outside test offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseCity', with: 'outside test offense city', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundOffenseDate', with: 'outside date of offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseDetails', with: 'outside offense details', match: :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('NameOfResourceFamily').value).to eq 'test'
    expect(find_field('ssn').value).to eq '123-45-6789'
    expect(find_field('driversLicenseNumberId').value).to eq 'D123'
    expect(find_field('californiaCriminalBackgroundoffenseReason').value).to eq 'test offense'
    expect(find_field('californiaCriminalBackgroundoffenseCity').value).to eq 'test offense city'
    expect(find_field('californiaCriminalBackgroundOffenseDate').value).to eq 'date of offense'
    expect(find_field('californiaCriminalBackgroundoffenseDetails').value).to eq 'offense details'

    expect(find_field('crimeBackgroundAgainstCohabitantoffenseReason').value).to eq 'cohab test offense'
    expect(find_field('crimeBackgroundAgainstCohabitantoffenseCity').value).to eq 'cohab test offense city'
    expect(find_field('crimeBackgroundAgainstCohabitantOffenseDate').value).to eq 'cohab date of offense'
    expect(find_field('crimeBackgroundAgainstCohabitantoffenseDetails').value).to eq 'cohab offense details'

    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseReason').value).to eq 'outside test offense'
    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseCity').value).to eq 'outside test offense city'
    expect(find_field('outsideCaliforniaCriminalBackgroundOffenseDate').value).to eq 'outside date of offense'
    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseDetails').value).to eq 'outside offense details'
  end

  scenario 'validate rfa01b sideNav', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application (Form 01)'
    expect(page).to have_content 'Rfa-01A Section Summary'
    page.find('#Rfa01AOverview').find('a.btn.btn-default').click

    first_name = 'alpha0'
    last_name = 'beta0'
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)

    click_button('Add Another Applicant +')
    # fill in second applicant details
    second_applicant_first_name = 'alpha1'
    second_applicant_last_name = 'beta1'
    fill_in('applicants[1].first_name', with: second_applicant_first_name, match: :prefer_exact)
    fill_in('applicants[1].last_name', with: second_applicant_last_name, match: :prefer_exact)

    # find other adult section, add 1 other adult
    other_adult_first_name = 'alpha2'
    other_adult_last_name = 'beta2'
    fill_in('otherAdults[0].firstName', with: other_adult_first_name, match: :prefer_exact)
    fill_in('otherAdults[0].lastName', with: other_adult_last_name, match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
#byebug
    expect(page.find('#edit_page > div > div > div > div.left-content.col-xs-3.col-sm-3.col-md-3.col-lg-3 > div > div.nav-menu.col-sm-10 > div > div.nav-menu > div:nth-child(2) > div > div > div > div > nav > ul > div > div:nth-child(1) > li > a').text).to eq("alpha0 beta0")
    expect(page.find('#edit_page > div > div > div > div.left-content.col-xs-3.col-sm-3.col-md-3.col-lg-3 > div > div.nav-menu.col-sm-10 > div > div.nav-menu > div:nth-child(2) > div > div > div > div > nav > ul > div > div:nth-child(2) > li > a').text).to eq("alpha1 beta1")
    expect(page.find('#edit_page > div > div > div > div.left-content.col-xs-3.col-sm-3.col-md-3.col-lg-3 > div > div.nav-menu.col-sm-10 > div > div.nav-menu > div:nth-child(2) > div > div > div > div > nav > ul > div > div:nth-child(3) > li > a').text).to eq("alpha2 beta2")

  end
end
