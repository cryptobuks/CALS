class Rfa::B01Controller < CalsBaseController
  def index
    rfa_b01_response = rfa_b01_application_helper.create_application(
      params[:application_id], params[:adult_id], params[:api_url_path])
    @rfa_b01_application = Rfa::B01::Application.new
    @rfa_b01_application.id = rfa_b01_response['id']
    redirect_to edit_rfa_b01_path(id: @rfa_b01_application.id,
      application_id: params[:application_id])
  end

  def edit
    @application_id = params[:application_id]
    @dictionaries = dictionaries_helper.rfa_b01_dictioniaries
    @rfa_b01_application = rfa_b01_application_helper.find_by_id(params[:id], @application_id)
  end

  def update
    rfa_b01_application_helper.update(params[:application][:id],
       params[:application_id], params[:application].to_json)
  end

  private

  def b01_params
    params.require(:b01).permit(:id, :lived_in_other_state, :convicted_in_california,
                                :convicted_in_another_state, :arrested_for_crime, :resource_family_name,
                                :applicant_first_name, :applicant_middle_name, :applicant_last_name,
                                :ssn, :date_of_birth, :driver_license, :signature, :application_date,
                                applicant_name_prefix:  %i[id value], applicant_name_suffix: %i[id value],
                                application_county:  %i[id value], driver_license_state:  %i[id value],
                                residence_address: %i[street_address zip city state: %i[id value] type: %i[id value]],
                                other_states_of_living: [%i[id value]],
                                disclosures: [%i[offense offense_city offense_date when_offense_happen offense_details signature application_date offense_state: %i[id value]]])
  end

  def rfa_b01_application_helper
    Helpers::Rfa::B01::ApplicationHelper.new(auth_header: get_session_token)
  end

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: get_session_token)
  end
end
