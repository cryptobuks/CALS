require 'rspec'
require 'rails_helper'

include RSpec

describe Rfa::B01Controller, set_auth_header: true do
  before(:each) do
    allow(controller).to receive_messages(authenticate_with_cwds: true)
  end

  describe '#index' do
    it 'redirects to edit' do
      application_helper = Helpers::Rfa::B01::ApplicationHelper.new(auth_header: ENV['TOKEN'])
      rfa_application_response = application_helper.create_application(1, 1, 'applicants')
      post :index, params: { api_url_path: 'applicants', application_id: 1, adult_id: 1 }
      expect(response.status).to eq(302)
    end
  end

  describe 'get edit' do
    it 'renders the edit page' do
      application_helper = Helpers::Rfa::B01::ApplicationHelper.new(auth_header: ENV['TOKEN'])
      rfa_application_response = application_helper.create_application(1, 1, 'applicants')
      get :edit, params: { id: rfa_application_response['id'], application_id: 1 }
      expect(response).to render_template('edit')
    end
  end

end
