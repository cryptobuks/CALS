class Helpers::Rfa::ApplicationPacketHelper < Helpers::ModelHelperBase

  def model_class
    Rfa::Packet
  end

  def rfa_01a_application(application_id)
    return  Rfa::Application.find_by_application_id(auth_header, application_id)
  end

  def rfa_01b_forms(application_id)
    return Rfa::B01::Application.all(auth_header, application_id)
  end

  def summary(application_id)
    return  Rfa::Packet.summary(auth_header, application_id)
  end

  def rfa_01c_application(application_id)
  	return Rfa::C01::Application.find_items_by_application_id(auth_header, application_id)
  end
end
