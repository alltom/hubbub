# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120513211122) do

  create_table "facebook_posts", :force => true do |t|
    t.string   "text"
    t.string   "actor"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.datetime "published_at",                    :null => false
    t.string   "facebook_id",                     :null => false
    t.integer  "user_id"
    t.boolean  "read",         :default => false, :null => false
  end

  add_index "facebook_posts", ["facebook_id"], :name => "index_facebook_posts_on_facebook_id", :unique => true

  create_table "filters", :force => true do |t|
    t.string   "json_contents"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "gmail_messages", :force => true do |t|
    t.string   "text"
    t.string   "from"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.datetime "published_at",                    :null => false
    t.string   "subject"
    t.integer  "user_id"
    t.string   "google_id",                       :null => false
    t.boolean  "read",         :default => false, :null => false
  end

  add_index "gmail_messages", ["google_id"], :name => "index_gmail_messages_on_google_id", :unique => true

  create_table "imgur_images", :force => true do |t|
    t.string   "url"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.datetime "published_at",                    :null => false
    t.string   "imgur_hash",                      :null => false
    t.integer  "user_id"
    t.boolean  "read",         :default => false, :null => false
  end

  add_index "imgur_images", ["imgur_hash"], :name => "index_imgur_images_on_imgur_hash", :unique => true

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       :limit => 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"
  add_index "taggings", ["tagger_id", "tagger_type"], :name => "index_taggings_on_tagger_id_and_tagger_type"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "tweets", :force => true do |t|
    t.string   "text"
    t.string   "tweeter"
    t.string   "tweeter_screen_name"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.datetime "published_at",                           :null => false
    t.string   "twitter_id",                             :null => false
    t.integer  "user_id"
    t.boolean  "read",                :default => false, :null => false
  end

  add_index "tweets", ["twitter_id"], :name => "index_tweets_on_twitter_id", :unique => true

  create_table "users", :force => true do |t|
    t.string   "password_digest"
    t.string   "email"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
