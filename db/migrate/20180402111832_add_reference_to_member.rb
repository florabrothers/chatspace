class AddReferenceToMember < ActiveRecord::Migration[5.0]
  def change
    add_reference :members, :user
    add_reference :members, :group
    add_foreign_key :members, :users
    add_foreign_key :members, :groups
  end
end
