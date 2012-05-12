# to ready your environment, run:
# 
# $ bundle install --without production
# 

source "https://rubygems.org"

gem "rails", "3.2.3"

# Bundle edge Rails instead:
# gem "rails", :git => "git://github.com/rails/rails.git"

gem "jquery-rails", '2.0.2'
gem "twitter", '2.2.6'
gem "koala", :git => "git://github.com/arsduo/koala"
gem "gmail", '0.4.0'
gem "curb"
gem "json"
gem "nokogiri"
gem "strong_parameters"

# Omniauth strategies, to authenticate us to the APIs
# Not all of the gems have their own OAuth utilities (twitter doesn't), so
# I'm using omniauth on all of them to be consistent.
gem "omniauth-twitter", '0.0.11'
gem "omniauth-facebook", '1.2.0'
gem "omniauth-google-oauth2", '0.1.9'

# plugin to implement tags
gem 'acts_as_taggable', :git => 'git://github.com/ivoreis/acts_as_taggable.git'

# user passwords are encrypted
gem "bcrypt-ruby", "~> 3.0.0"

group :development, :test do
  gem "sqlite3"
  gem "rspec-rails", '2.9.0'
end

group :production do
  gem "pg"
end

group :assets do
  gem "sass-rails",   "~> 3.2.3"
  gem "coffee-rails", "~> 3.2.1"

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem "therubyracer", :platform => :ruby

  gem "uglifier", ">= 1.0.3"
end

group :test do
  gem 'capybara', '1.1.2'
end

