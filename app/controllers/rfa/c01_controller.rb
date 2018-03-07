class Rfa::C01Controller < CalsBaseController
  def index
    @rfa_c01_application = rfa_c01_application_helper.create(params[:a01_id], '{}')
    redirect_to edit_rfa_a01_c01_path(id: @rfa_c01_application.id, a01_id: params[:a01_id])
  end

  def edit
    @user = user_from_session
    @dictionaries = dictionaries_helper.rfa_c01_dictioniaries
    @rfa_c1_application = rfa_c01_application_helper.find_by_id(params[:a01_id], params[:id])
    @rfa_a01_application = rfa_application_helper.find_by_application_id(params[:a01_id])
    @rfa_a01_application['rfa1c_forms'] = rfa_c01_application_helper.all(params[:a01_id])
  end

  def update
    rfa_c01_application_helper.update(params[:a01_id], params[:id], c01_params.to_json)
    render json: rfa_c01_application_helper.find_by_id(params[:a01_id], params[:id])
  rescue ApiError => e
    render json: e.response, status: e.status
  end

  private

  def c01_params
    params.require(:c01).permit(:id, :child_identified, identified_children:
                                [:child_in_home, :date_of_birth, :date_of_placement,
                                 :first_name, :middle_name, :last_name, :school_name,
                                 name_suffix: %i[id value], school_grade: %i[id value],
                                 gender: %i[id value], county_of_jurisdiction: %i[id value],
                                 school_address: [:street_address, :zip, :city, state: %i[id value]],
                                 relationship_to_applicants: [:applicant_id,
                                                              :relationship_to_applicant_freeform,
                                                              relationship_to_applicant: %i[id value]]],
                                application_county: %i[id value])
  end

  def rfa_c01_application_helper
    Helpers::Rfa::C01::ApplicationHelper.new(auth_header: get_session_token)
  end

  def rfa_application_helper
    Helpers::Rfa::ApplicationHelper.new(auth_header: get_session_token)
  end

  def rfa_applicant_helper
    Helpers::Rfa::ApplicantHelper.new(auth_header: get_session_token)
  end

  def dictionaries_helper
    Helpers::Dictionary.new(auth_header: get_session_token)
  end
end
