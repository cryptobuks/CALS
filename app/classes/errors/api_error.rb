# customizable error class
class ApiError < StandardError
  attr_reader :status
  attr_reader :response
  def initialize(response = 'My default response', status = 200)
    @status = status
    @response = response
  end
end
