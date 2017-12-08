module Concerns::Rfa::C01::ApplicationC01ApiProtocolProvider
  extend ActiveSupport::Concern
  include Concerns::RfaBaseApiProtocolProvider

  class_methods do
    def find_by_id(application_id, rfa_c01_form_id, auth_header)
      response = FaradayCals.get('/rfa-1a-forms/' + application_id + '/rfa-1c-forms/' + rfa_c01_form_id, auth_header)
      JSON.parse(response.body)
    end

  end
end
