json.array! @new_message.each do |message|
  json.id message.id
  json.text message.text
  json.image message.image
  json.created_at message.created_at.to_s[0..15]
  json.username message.user.name
end
