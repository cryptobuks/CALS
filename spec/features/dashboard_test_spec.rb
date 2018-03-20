require 'rails_helper'
require 'vcr'
require 'faker'


RSpec.feature 'Dashboard', js: true, set_auth_header: true  do
  before(:each) do
    #allow_any_instance_of(WelcomeController).to receive(:disable_rfa_application).and_return(true)
    stub_const('DISABLE_RFA_APPLICATION', true)
  end

  scenario 'create rfa button to be disabled when disable rfa application is set to TRUE', set_auth_header: true do
     visit root_path
     expect(page).to have_button('Create RFA Application (Form 01)', disabled: true)
  end

  scenario 'to disable applications table div when disable rfa application is set to TRUE', set_auth_header: true do
   	  visit root_path
   	  expect(page).not_to have_selector("#applications_list")
  end
end