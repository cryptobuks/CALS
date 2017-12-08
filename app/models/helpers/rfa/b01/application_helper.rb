class Helpers::Rfa::B01::ApplicationHelper < Helpers::ModelHelperBase
  def model_class
    Rfa::B01::Application
  end

  def create_application(applicationId, applicantId, api_url_path)
    model_class.create_application(auth_header, applicationId, applicantId, api_url_path)
  end

  def all(applicationId)
    model_class.all(auth_header, applicationId)
  end

  def find_by_id(id, application_id)
    model_class.find_by_id(id, application_id, auth_header)
  end

  def update(id, application_id, body)
    model_class.update(id, application_id, body, auth_header)
  end
end
