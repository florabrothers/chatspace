class MessagesController < ApplicationController

  def index
    @users_group = current_user.groups.all
  end

end
