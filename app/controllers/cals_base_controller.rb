class CalsBaseController < ApplicationController
  include AuthenticationProvider
  include RedisHelper
  before_action :authenticate_with_cwds # , unless: 'Rails.env.development?'


  def logout
    delete_user_from_session
    default_callback_url = ''
    redirect_to Cwds::Authentication.logout_url(AUTHENTICATION_API_BASE_URL, default_callback_url)
  end

  protected

  def process_items_for_persistance(items, helper, parent_id)
    result = []
    if items.is_a?(Array)
      items.each do |item|
        result << create_update_or_delete(item, helper, parent_id)
      end
      result.reject(&:blank?)
    else
      result = create_update_or_delete(items, helper, parent_id)
    end
    result
  end

  def create_update_or_delete(item, helper, parent_id)
    if item[:to_delete]
      helper.delete(parent_id, item[:id])
    else
      item[:id] ? helper.update(parent_id, item[:id], item.to_json) : helper.create(parent_id, item.to_json)
    end
  end

  def set_relationship_to_applicants(parameters, applicants)
    applicant_names = applicants.map { |app| [app.id, "#{app.first_name} #{app.middle_name} #{app.last_name}".squish] }.to_h
    if 0.eql?(parameters['applicant_id'].to_i)
      parameters.merge!(ActionController::Parameters.new('applicant_id' => applicant_names.key(parameters['applicant_id'])).permit!)
    end
    parameters
  end

  def authenticate_with_cwds
    token = Cwds::Authentication.token_generation(params[:accessCode], AUTHENTICATION_API_BASE_URL) if session[:user_details].blank?
    session.delete(:token) if token.present?
    if session[:token].blank?
      if Cwds::Authentication.token_validation(token, AUTHENTICATION_API_BASE_URL)
        store_token_in_redis(token)
        session[:user_details] = Cwds::Authentication.store_user_details_from_token(token)
      else
        redirect_to Cwds::Authentication.authentication_url(AUTHENTICATION_API_BASE_URL, request.url)
      end
    end
    session[:user_details] = Cwds::Authentication.store_user_details_from_token(token) if session[:user_details].blank?
    @user = get_user_from_session if session[:user_details].present?
  end
end
