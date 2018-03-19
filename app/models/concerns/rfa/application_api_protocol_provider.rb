module Concerns::Rfa::ApplicationApiProtocolProvider
  extend ActiveSupport::Concern
  include Concerns::RfaBaseApiProtocolProvider

  class_methods do
    def all_expanded(auth_header)
      response = FaradayCals.get('/' + api_resource_path + '?expanded=true', auth_header)
      JSON.parse(response.body)['items'].map { |itm| new(itm) }
    end

    def create_application(auth_header)
      #create, so we aren't posting a body
      response = FaradayCals.post('/rfa-1a-forms', auth_header,'{}')
      JSON.parse(response.body)
    end

    def submit_application(auth_header, application_id)
      response = FaradayCals.post("/rfa-1a-forms/#{application_id}/status", auth_header, '{"status":"SUBMITTED"}')
      JSON.parse(response.body)
      response.status == 200 ? nil : JSON.parse(response.body)
    end

    def update(auth_header, parent_id, _id, body)
      response = FaradayCals.put("/rfa-1a-forms/#{parent_id}", auth_header, body)
      new(JSON.parse(response.body))
    end

    def find_by_application_id(auth_header, application_id)
      response = FaradayCals.get("/#{api_resource_path}/#{application_id}?expanded=true", auth_header)
      response.status == 200 ? JSON.parse(response.body) : nil
    end
  end
end
