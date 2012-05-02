# to ready your environment, run:
# 
# $ bundle install --without production
# 

source "https://rubygems.org"

gem "rails", "3.2.3"

# Bundle edge Rails instead:
# gem "rails", :git => "git://github.com/rails/rails.git"

# gem "jquery-rails"

group :development, :test do
  gem "sqlite3"
  gem 'rspec-rails', '2.9.0'
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
