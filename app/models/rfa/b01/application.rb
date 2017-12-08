class Rfa::B01::Application < CalsBase
  include Concerns::Rfa::B01::ApplicationB01ApiProtocolProvider
  attr_accessor :id, :lived_in_other_state, :convicted_in_california,
    :convicted_in_another_state, :arrested_for_crime, :resource_family_name,
    :applicant_first_name, :applicant_middle_name, :applicant_last_name,
    :ssn, :date_of_birth, :driver_license, :signature, :application_date,
    :applicant_name_prefix, :applicant_name_suffix, :application_county,
    :residence_address, :other_states_of_living, :convicted_in_california_disclosures,
    :driver_license_state


  def self.api_resource_path
    'rfa-1b-forms'
  end

end
