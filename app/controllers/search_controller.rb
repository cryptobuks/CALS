class SearchController < CalsBaseController

  def index
    @landingPage_url = SANDBOX_LANDING_URL
    @dictionaries    = dictionaries_helper.facilities_dictionaries
    @county_value = check_for_nil(session[:county_value])
    @facility_type_value = check_for_nil(session[:facility_type])
    @facility_id = check_for_nil(session[:facility_id])
    @facility_name = check_for_nil(session[:facility_name])
    @facility_address = check_for_nil(session[:facility_address])
    @from = check_for_nil(session[:from])
    @size = check_for_nil(session[:size])
    @page_number = check_for_nil(session[:page_number])
    @input_data = check_for_nil(session[:input_data])
    @user = user_from_session
  end

  def check_for_nil(session_value)
    params[:search_params].nil? ? session_value : nil
  end

  private

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: get_session_token)
  end

end
