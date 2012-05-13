class CreateFilters < ActiveRecord::Migration
  def change
    create_table :filters do |t|
      t.string :json_contents

      t.timestamps
    end
  end
end
