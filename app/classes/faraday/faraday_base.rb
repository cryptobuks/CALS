class Faraday::FaradayBase
  BODY_METHODS = %i[post put].freeze

  class_attribute :base_url


  def self.get(url, auth_header)
    faraday_shared(:get, "#{self.base_url}#{url}", auth_header)
  end

  def self.post(url, auth_header, body)
    faraday_shared(:post, "#{self.base_url}#{url}", auth_header, body)
  end

  def self.put(url, auth_header, body)
    faraday_shared(:put, "#{self.base_url}#{url}", auth_header, body)
  end

  def self.delete(url, auth_header)
    faraday_shared(:delete,  "#{self.base_url}#{url}", auth_header)
  end

  # private

  def self.faraday_shared(method, url, auth_header, body = nil)
    unless Rails.env.test?
      Rails.logger.info('API call request: ')
      Rails.logger.info("URL : #{url}")
      Rails.logger.info("Method : #{method}")
    end

    conn = Faraday.new(url: url) do |c|
      c.use CalsFaradayMiddleware::ApiErrorException
      c.adapter Faraday.default_adapter
    end

    response = conn.send(method) do |req|
      req.url url
      req.headers = default_headers(auth_header)
      req.body = body if method.in?(BODY_METHODS)
      req.options.timeout = 5
    end

    unless Rails.env.test?
      Rails.logger.info('API call response:')
      Rails.logger.info(response)
    end
    return response
  end

  def self.default_headers(auth_header)
    header_hash = {
      :'Content-Type' => 'application/json'
    }
    header_hash.merge!({:'Authorization' => auth_header}) if auth_header.present?
    return header_hash
  end

  private_class_method :default_headers, :faraday_shared
end
