class User < ActiveRecord::Base
  has_secure_password
  
  attr_accessible :email, :password, :password_confirmation
  
  validates_presence_of :email
  validates_uniqueness_of :email
  
  has_many :facebook_posts
  has_many :gmail_messages
  has_many :imgur_images
  has_many :tweets
  
  def self.authenticate email, password
    find_by_email(email).try(:authenticate, password)
  end
end
