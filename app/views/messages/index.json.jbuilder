json.messages @messages.each do |m|
  json.id m.id
  json.text m.text
  json.image m.image
  json.created_at m.created_at.to_s[0..15]
  json.user_name m.user.name
end
