class CreateReviews < ActiveRecord::Migration[5.0]
  def change
    create_table :reviews do |t|
      t.string :truck_name
      t.string :body
      t.integer :rating
      t.integer :user_id

      t.timestamps
    end
  end
end
