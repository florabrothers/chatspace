json.text @message.text
json.image image_tag @message.image
json.ca @message.created_at.to_s[0..15]
json.user_name @message.user.name
json.url @group
