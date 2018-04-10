json.text @message.text
json.image @message.image
json.created_at @message.created_at.to_s[0..15]
json.user_name @message.user.name
json.url @group
