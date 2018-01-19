class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :links, :hash, :shortened_url
  end
end
