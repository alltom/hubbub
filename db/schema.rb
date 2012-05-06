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

ActiveRecord::Schema.define(:version => 20120506160535) do

  create_table "facebook_posts", :force => true do |t|
    t.string   "text"
    t.string   "actor"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.datetime "published_at", :null => false
  end

  create_table "gmail_messages", :force => true do |t|
    t.string   "text"
    t.string   "from"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.datetime "published_at", :null => false
    t.string   "subject"
  end

  create_table "imgur_images", :force => true do |t|
    t.string   "url"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.datetime "published_at", :null => false
  end

  create_table "tweets", :force => true do |t|
    t.string   "text"
    t.string   "tweeter"
    t.string   "tweeter_screen_name"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.datetime "published_at",        :null => false
  end

end
