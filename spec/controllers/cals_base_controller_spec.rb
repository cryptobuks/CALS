require 'rspec'
require 'rails_helper'

describe CalsBaseController do
  controller do
    def custom
      render json: true, status: :ok
    end
  end

  before do
    routes.draw { get 'custom' => 'cals_base#custom' }
  end

  it 'sets token when token is empty' do
    allow(Cwds::Authentication).to receive(:token_generation).with('dcba', AUTHENTICATION_API_BASE_URL).and_return('abcd')
    allow(Cwds::Authentication).to receive(:token_validation).with('abcd', AUTHENTICATION_API_BASE_URL).and_return(true)

    process :custom, method: :get, params: {accessCode: 'dcba'}
    expect(session['token']).to eq('abcd')
  end

  it 'redirects when token invalid' do
    allow(Cwds::Authentication).to receive(:authentication_url).with(AUTHENTICATION_API_BASE_URL, 'http://test.host/custom').and_return('www.google.com')
    process :custom, method: :get
    expect(response).to redirect_to 'www.google.com'
  end

end
