class Group < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :users, through: :members
  has_many :members
  has_many :messages

  def show_last_message
    if (last_message = messages.last).present?
      last_message.text? ? last_message.text : "画像が投稿されています"
    else
      "No message yet"
    end
  end
end
