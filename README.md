# DB設計

![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

**users(ユーザー) Table:**
|Column|Type|Option|
|------|----|-------|
|id|integer||
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

**groups(チャートグループ) Table:**
|Column|Type|Option|
|------|----|-------|
|id|integer||
|name|string|null: false, unique: true|

**members(チャートメンバー) Table:**
|Column|Type|Option|
|------|----|-------|
|id|integer||
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

**messages(チャートメッセージ) Table:**
|Column|Type|Option|
|------|----|-------|
|id|integer||
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
|body|text||
|image|string: BLOB||


# Association

**users Association**
- has_many :groups, through: members
- has many :messages
- has many :members

**groups Association**
- has_many :users, through: members
- has_many :messages
- has_many :members

**members Association**
- belongs_to :user
- belongs_to :group

**messages Association**
- belongs_to :user
- belongs_to :group
