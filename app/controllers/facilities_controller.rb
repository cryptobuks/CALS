class FacilitiesController < CalsBaseController

  include Response

  def index
    #  @race_types = Helpers::Dictionaries::RaceTypeHelper.new(auth_header: 'abc').all
    # byebug

    @facilities = facility_helper.all
  end

  def show
    @facility = facility_helper.find_by_id(params[:id])
    @children = child_helper.find_by_facility(params[:id])
    @complaints = complaint_helper.find_by_facility(params[:id])
    #@facility = @facility
  end

  def search
    store_in_session(params)
    size_params = params[:size]
    from_params = params[:from]
    post_data = request.body.read
    parsed_post_data = JSON.parse(post_data)
    params_dictionary = {}
    parsed_post_data.each do |k, v|
      if k == 'addresses.address.street_address'
        params_dictionary[k] = v.split(',')
      else
        params_dictionary[k] = [v]
      end
    end
    query_hash = QueryPreprocessor.params_to_query_hash(params_dictionary)
    logger.info "query_hash: #{query_hash}"
    es_query_json = Elastic::QueryBuilder.facility_search_v1(query_hash, from_params, size_params).to_json
    logger.info "es query: #{es_query_json}"
    @facilities = facility_helper.search es_query_json
    @facilities_response = {}
    @facilities_response['facilities'] = @facilities['hits']['hits'].collect { |facility| facility['_source']}
    @facilities_response['facilities'].sort_by! {|facility_name| facility_name['name']}
    @facilities_response['total'] = @facilities['hits']['total']
    json_response @facilities_response
  end

  def store_in_session(params)
    session[:size] = params['size'].to_i
    session[:page_number] = params['pageNumber'].to_i
    session[:input_data] = {}
    session[:input_data]['countyValue'] = params['county.value']
    session[:input_data]['facilityTypeValue'] = params['type.value']
    session[:input_data]['facilityIdValue'] = params['id']
    session[:input_data]['facilityNameValue'] = params['name']
    session[:input_data]['facilityAddressValue'] = params['addresses.address.street_address']
  end

  private

  def facility_helper
    Helpers::Facility.new(auth_header: get_session_token)
  end

  def child_helper
    Helpers::Child.new(auth_header: get_session_token)
  end

  def complaint_helper
    Helpers::Complaint.new(auth_header: get_session_token)
  end
end
