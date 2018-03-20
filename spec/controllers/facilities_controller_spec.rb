require 'rspec'
require 'rails_helper'

describe FacilitiesController do
  before do
    allow_any_instance_of(CalsBaseController).to receive(:authenticate_with_cwds).and_return(true)
    allow_any_instance_of(CalsBaseController).to receive(:get_session_token).and_return(ENV['TOKEN'])
  end

  #describe 'GET index' do
  #it 'assigns @facilities' do
  #get :index
  #expect(assigns(:facilities).size).to eq(53)
  #end

  #it 'renders the index template' do
  #get :index
  #expect(response).to render_template('index')
  #end
  #end

  describe 'POST search' do
    it 'renders search' do
      request.headers['Content-Type'] = 'application/json'
      request.headers['Accept'] = 'application/json'
      post :search, {:params => {:name => ['home'], :sort=>[''], :order=>['']} }
      expect(response.status).to eq(200)
      expect(response.body.include?('TWEEDLE'))
    end
  end
end
