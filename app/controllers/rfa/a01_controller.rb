class Rfa::A01Controller < CalsBaseController
  #include AuthenticationProvider
  def index
    @applications = rfa_application_helper.all
  end

  def create
    # make api call to create application
    rfa_app_response = rfa_application_helper.create_application
    rfa_application = Rfa::Application.new
    rfa_application.id = rfa_app_response['id']
    redirect_to rfa_a01_packet_index_path(rfa_application.id)
  end

  def edit
    # @all dictionaries
    @user = user_from_session
    @dictionaries = dictionaries_helper.rfa_a01_dictioniaries
    @application = rfa_application_helper.find_by_id(params[:id])
    @application.applicants = rfa_applicant_helper.find_items_by_application_id(params[:id])
    @application.residence = rfa_residence_helper.find_by_application_id(params[:id])
    @application.applicants_history = rfa_applicant_history_helper.find_by_application_id(params[:id])
    @application.minor_children = rfa_minor_children_helper.find_items_by_application_id(params[:id])
    @application.other_adults = rfa_other_adults_helper.find_items_by_application_id(params[:id])
    @application.adoption_history = rfa_adoption_history_helper.find_by_application_id(params[:id])
    @application.applicants_relationship = rfa_relation_between_applicants_helper.find_by_application_id(params[:id])
    @application.child_desired = rfa_child_desired_helper.find_by_application_id(params[:id])
    @application.references = rfa_references_helper.find_items_by_application_id(params[:id])
    @application.rfa1c_forms = rfa_c01_application_helper.all(params[:id])
  end

  def update
    @application_response = {}
    @application_response[:application_county] = process_items_for_persistance(application_county_params, rfa_application_helper, params[:id]) if params[:application_county].present?
    @application_response[:applicants] = process_items_for_persistance(applicant_params, rfa_applicant_helper, params[:id]) if params[:applicants].present?
    @application_response[:residence] = process_items_for_persistance(residence_params, rfa_residence_helper, params[:id]) if params[:residence].present?
    @application_response[:applicants_history] = process_items_for_persistance(applicants_history_params, rfa_applicant_history_helper, params[:id]) if params[:applicants_history].present?
    @application_response[:minor_children] = process_items_for_persistance(minor_children_params, rfa_minor_children_helper, params[:id]) if params[:minor_children].present?
    @application_response[:other_adults] = process_items_for_persistance(other_adults_params, rfa_other_adults_helper, params[:id]) if params[:other_adults].present?
    @application_response[:adoption_history] = process_items_for_persistance(adoption_history_params, rfa_adoption_history_helper, params[:id]) if params[:adoption_history].present?
    @application_response[:applicants_relationship] = process_items_for_persistance(relationship_between_applicants_params, rfa_relation_between_applicants_helper, params[:id]) if params[:applicants_relationship].present?
    @application_response[:references] = process_items_for_persistance(references_params, rfa_references_helper, params[:id]) if params[:references].present?
    @application_response[:child_desired] = process_items_for_persistance(child_desired_params, rfa_child_desired_helper, params[:id]) if params[:child_desired].present?
    @application_response[:references] = process_items_for_persistance(references_params, rfa_references_helper, params[:id]) if params[:references].present?

    render json: rfa_application_helper.find_by_application_id(params[:id])
  rescue ApiError => e
    render json: e.response, status: e.status
  end

  private

  def application_county_params
    params.permit(:id, :to_delete, {application_county: %i[value id]})
  end

  def applicant_params
    params.require(:applicants).map do |applicant|
      applicant.permit!
      ActionController::Parameters.new(applicant.to_h).permit(:id, :to_delete, :email,
                                                              :date_of_birth, :first_name, :middle_name, :last_name, :driver_license_number,
                                                              { name_suffix: %i[id value] }, { name_prefix: %i[id value] },
                                                              { employment: [:employer_name, :occupation, :income, income_type: %i[id value],
                                                                             physical_address: [:street_address, :city, :zip, state: %i[id value]]] },
                                                              { highest_education_level: %i[id value] }, { gender: %i[id value] },
                                                              { ethnicity: %i[id value] }, { driver_license_state: %i[id value] },
                                                              phones: [:to_delete, :number, :preferred, phone_type: %i[id value]],
                                                              other_names: [:first_name, :middle_name, :last_name, name_type: %i[id value],
                                                                            name_suffix: %i[id value], name_prefix: %i[id value]])
    end
  end

  def residence_params
    params.require(:residence).permit(:id, :to_delete, :physical_mailing_similar, :weapon_in_home,
                                      :body_of_water_exist, :body_of_water_description, :others_using_residence_as_mailing,
                                      :directions_to_home, residence_ownership: %i[id value], home_languages: %i[id value],
                                      other_people_using_residence_as_mailing: %i[first_name middle_name last_name],
                                      physical_address: [:street_address, :zip, :city, state: %i[id value]],
                                      addresses: [:street_address, :zip, :city, state: %i[id value], type: %i[id value]])
  end

  def applicants_history_params
    applicants_history = params.require(:applicants_history)
    applicants = @application_response[:applicants]
    applicants_history['former_spouses'].each do |former_spouse|
      set_relationship_to_applicants(former_spouse, applicants)
    end
    applicants_history['adult_children'].each do |adult_child|
      set_relationship_to_applicants(adult_child['relationship_to_applicants'][0], applicants)
    end
    applicants_history.permit!
    ActionController::Parameters.new(applicants_history.to_h).permit(:to_delete,
                                              former_spouses: [:first_name, :middle_name, :last_name,
                                                               :applicant_id, :date_of_marriage, :place_of_marriage_city,
                                                               :date_of_marriage_end, :place_of_marriage_end_city,
                                                               relationship_type:  %i[id value],
                                                               name_prefix:  %i[id value], name_suffix:  %i[id value],
                                                               place_of_marriage_state:  %i[id value],
                                                               marriage_termination_reason:  %i[id value],
                                                               place_of_marriage_end_state:  %i[id value]],
                                              adult_children: [:first_name, :middle_name, :last_name, :lives_in_home,
                                                               name_prefix: %i[id value], name_suffix: %i[id value],
                                                               address: [:street_address, :zip, :city, state: %i[id value], type: %i[id value]],
                                                               relationship_to_applicants: [:applicant_id, relationship_to_applicant: %i[id value]]])
  end

  def minor_children_params
    params.require(:minor_children).map do |minor|
      minor.permit!
      minor['relationship_to_applicants'][0] = set_relationship_to_applicants(minor['relationship_to_applicants'][0], @application_response[:applicants])
      ActionController::Parameters.new(minor.to_h).permit(
        :id, :to_delete, :child_financially_supported, :date_of_birth, :child_adopted, gender: %i[id value],
        relationship_to_applicants: [:applicant_id, relationship_to_applicant: %i[id value]]
      )
    end
  end

  def other_adults_params
    params.require(:other_adults).map do |adult|
      adult.permit!
      adult['relationship_to_applicants'][0] = set_relationship_to_applicants(adult['relationship_to_applicants'][0], @application_response[:applicants])
      ActionController::Parameters.new(adult.to_h).permit(
        :id, :to_delete, :first_name, :middle_name, :last_name, :date_of_birth,
        relationship_to_applicants: [:applicant_id, relationship_to_applicant: %i[id value]]
      )
    end
  end

  def relationship_between_applicants_params
    params.require(:applicants_relationship).permit(:to_delete, :other_relationship, :place_of_relationship_city,
                                                          :date_of_relationship, relationship_type: %i[id value],
                                                          place_of_relationship_state: %i[id value])
  end


  def child_desired_params
    params.require(:child_desired).permit(:to_delete, :child_identified, :child_in_home, preferred_ages: %i[id value],
                                          preferred_sibling_group_up_to: %i[id value])
  end

  def adoption_history_params
    params.require(:adoption_history).permit(:id, :to_delete, :was_subject_for_exclusion_order_q7,
                                              foster_care_licenses_q1: [:was_previously_licensed, agencies: [:name, type: %i[id value]]],
                                              applications_for_adoption_q2: [:have_applied_for_adoption, facilities: []],
                                              facility_operation_licenses_q3: [:was_previously_licensed, agencies: [:name, type: %i[id value]]],
                                              employment_in_facilities_q4: [:was_employed_or_volunteered, facilities: []],
                                              denial_history_q5: [:had_denials, agencies: [:name, type: %i[id value]]],
                                              suspension_revocation_history_q6: [:had_suspensions_revocations, agencies: [:name, type: %i[id value]]])
  end

  def references_params
    permitted_params = params.permit(:to_delete, references: [:first_name, :middle_name, :last_name, :phone_number, :email,
                                                              mailing_address: [:street_address, :zip, :city, state: %i[id value]],
                                                              name_prefix: %i[id value], name_suffix: %i[id value]])

    permitted_params[:items] = permitted_params.delete(:references)
    permitted_params
  end

  def rfa_application_helper
    Helpers::Rfa::ApplicationHelper.new(auth_header: get_session_token)
  end

  def rfa_b01_application_helper
    Helpers::Rfa::B01::ApplicationHelper.new(auth_header: get_session_token)
  end

  def rfa_c01_application_helper
    Helpers::Rfa::C01::ApplicationHelper.new(auth_header: get_session_token)
  end

  def rfa_applicant_helper
    Helpers::Rfa::ApplicantHelper.new(auth_header: get_session_token)
  end

  def rfa_applicant_history_helper
    Helpers::Rfa::ApplicantHistoryHelper.new(auth_header: get_session_token)
  end

  def rfa_residence_helper
    Helpers::Rfa::ApplicationResidenceHelper.new(auth_header: get_session_token)
  end

  def rfa_adoption_history_helper
    Helpers::Rfa::AdoptionHistoryHelper.new(auth_header: get_session_token)
  end

  def rfa_minor_children_helper
    Helpers::Rfa::ApplicationMinorChildrenHelper.new(auth_header: get_session_token)
  end

  def rfa_other_adults_helper
    Helpers::Rfa::ApplicationOtherAdultsHelper.new(auth_header: get_session_token)
  end

  def rfa_relation_between_applicants_helper
    Helpers::Rfa::ApplicationRelationApplicantsHelper.new(auth_header: get_session_token)
  end

  def rfa_child_desired_helper
    Helpers::Rfa::ApplicationChildDesiredHelper.new(auth_header: get_session_token)
  end

  def rfa_references_helper
    Helpers::Rfa::ApplicationReferencessHelper.new(auth_header: get_session_token)
  end

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: get_session_token)
  end
end
