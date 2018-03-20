require 'rspec'
require 'rails_helper'

describe FacilitiesController do

  describe "Build query" do
    it "builds simple bool AND" do

      expected_output = {
        bool: {
          must: [
            { match_phrase: {'fac_co_nbr':'28'} },
            { match_phrase:{'fac_name':'home'} }
          ]
      }}

      input = {fac_co_nbr: '28', fac_name: 'home'}
      output = Elastic::QueryBuilder.match_and(input)

      expect(output).to eq(expected_output)
    end

    it "builds complex bool AND/OR" do

      expected_output = {
        query: {
          bool: {
            should: [
              {bool:
               {must: [
                  {match_phrase:{'fac_co_nbr':'28'}},
                  {match_phrase:{'fac_name':'home'}}
                ]
                }
               }]
          }
        }
      }

      input = [{"fac_co_nbr"=>"28", "fac_name"=>"home"}]
      output = Elastic::QueryBuilder.match_boolean(input)
      expect(output).to eq(expected_output)
    end

    it "builds sort query" do

      expected_output = {
        sort: [
          {
            '_score' =>
            {
              order: 'asc'
            }
          }
        ]
      }
      input = {"sort_params"=>"_score", "order_params"=>"asc"}
      output = Elastic::QueryBuilder.sort_query(input)
      expect(output).to eq(expected_output)
    end

    it "builds paginate query" do

      expected_output = {
        from: '0',
        size: '5'
      }
      input = {"size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.paginate_query(input)
      expect(output).to eq(expected_output)
    end

    it "build query merging pagination and sort" do

      expected_output = {
        query:
        {
          bool:
          {
            should:
            [{
               bool:
               {must:
                [{match_phrase:
                  {
                    "county.value":
                  "Los Angeles"}
                  },
                 {
                   match_phrase:
                   {
                     "type.value":
                   "Resource Family Home"}
                 },
                 {
                   match_phrase:
                   {
                     "id":"123124"
                 }},
                 {
                   match_phrase:
                   {
                   "name":"home"}
                 }
                 ]
                }
             }
             ]
          }
        },
        from:"0",
        size:"5",
        sort: [
          {
            '_score' =>
            {
              order: 'asc'
            }
          }
        ]
      }
      query_array = [{"county.value"=>"Los Angeles", "type.value"=>"Resource Family Home", "id"=>"123124", "name"=>"home"}]
      page_params = {"sort_params"=>"_score", "order_params"=>"asc", "size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.facility_search_v1(query_array, page_params)
      expect(output).to eq(expected_output)
    end

    it "build query with address, merging pagination and sort" do

      expected_output = {
        query:
        {
          bool:
          {
            should:
            [{
               bool:
               {must:
                [{match_phrase:
                  {
                  "county.value": "Los Angeles"}
                  },
                 {
                   match_phrase:
                   {
                   "type.value": "Adoption Agency"}
                 },
                 {
                   match_phrase:
                   {
                     "id": "9jstosjaww"
                 }},
                 {
                   match_phrase:
                   {
                   "name": "home"}
                 },
                 {
                   nested:
                   {
                     path: "addresses",
                     score_mode: "avg",
                     query:
                     {
                       multi_match:
                       {
                         query: "4140 Roxanne Street",
                         type: "phrase",
                         fields:
                         [
                           "addresses.address.street_address","addresses.address.state","addresses.address.city","addresses.address.zip_code"
                         ]
                       }
                     }
                   }
                 }
                 ]
                }
             }
             ]
          }
        },
        from:"0",
        size:"5",
        sort: [
          {
            '_score' =>
            {
              order: 'asc'
            }
          }
        ]
      }
      query_array = [{"county.value"=>"Los Angeles", "type.value"=>"Adoption Agency", "id"=>"9jstosjaww", "name"=>"home", "addresses.address.street_address"=>"4140 Roxanne Street"},
                     {"county.value"=>"Los Angeles", "type.value"=>"Adoption Agency", "id"=>"9jstosjaww", "name"=>"home", "addresses.address.street_address"=>"  Los Angeles"},
                     {"county.value"=>"Los Angeles", "type.value"=>"Adoption Agency", "id"=>"9jstosjaww", "name"=>"home", "addresses.address.street_address"=>" CA 97777"}]
      page_params = {"sort_params"=>"_score", "order_params"=>"asc", "size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.facility_search_v1(query_array, page_params)
      expect(output).to eq(expected_output)
    end

  end

end
