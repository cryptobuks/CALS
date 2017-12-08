module Concerns::Rfa::ApplicationPacketApiProtocolProvider
  extend ActiveSupport::Concern
  include Concerns::RfaBaseApiProtocolProvider

  class_methods do
    def summary(auth_header, parent_id)
      response = FaradayCals.get("/rfa-packet/#{parent_id}/summary", auth_header)
      JSON.parse(response.body)
    end
  end
end
