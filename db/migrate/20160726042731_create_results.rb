class CreateResults < ActiveRecord::Migration[5.0]
  def change
    create_table :results do |t|
      t.string :pid
      t.text :json

      t.timestamps
    end
  end
end
