source 'https://rubygems.org'

ruby '2.4.2'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Environment variables configuration
gem 'dotenv-rails', '~> 2.2', groups: %i[development test aws_dev]

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1', '<= 5.1.2'

gem 'foreman'
gem 'responders', '~> 2.3'
gem 'autoprefixer-rails', '~> 6.7'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'bootstrap'
gem 'react-rails', '~> 2.2'

gem 'redis-rails', '~> 5.0'
gem 'redis-namespace'
gem 'redis'
gem 'redis-rack-cache'
gem 'faraday'
gem 'faraday_middleware'

# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', github: 'rails/sass-rails'
gem 'font-awesome-sass'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 3.2'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'

gem 'cwds-authentication', github: 'ca-cwds/cwds-authentication', :ref => '82c1dcf'
#gem 'woodduck-rails', github: "ca-cwds/woodduck-rails", branch: 'development'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.7'
  gem 'selenium-webdriver'
  gem 'vcr'
  gem 'webmock'
  gem 'faker'
  gem 'rspec', '~> 3.5', '< 3.6.0'
  gem 'rspec-rails', '~> 3.5', '< 3.6.0'
  gem 'awesome_print', :require => 'ap'
  gem 'rubocop', '~> 0.48.1', require: false

  gem 'factory_girl'
  gem 'factory_girl_rails'
  gem 'rails-controller-testing'
  gem 'poltergeist'
  gem 'chromedriver-helper'
end

group :test do
  gem 'simplecov', require: false
  gem 'codeclimate-test-reporter', '~> 1.0.0'
  gem 'mock_redis'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'newrelic_rpm'
