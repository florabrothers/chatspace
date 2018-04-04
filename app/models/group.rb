class Group < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  validates :name, presence: true, on: :update, allow_blank: false

  has_many :users, through: :members
  has_many :members

end
