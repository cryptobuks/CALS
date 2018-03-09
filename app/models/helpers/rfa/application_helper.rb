class Helpers::Rfa::ApplicationHelper < Helpers::ModelHelperBase

  def model_class
    Rfa::Application
  end

  def submit_application(application_id)
    Rfa::Application.submit_application(auth_header, application_id)
  end

  def create_application
    Rfa::Application.create_application(auth_header)
  end

  def all_expanded
    ::Rfa::Application.all_expanded(auth_header)
  end
end
