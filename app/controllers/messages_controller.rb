class MessagesController < ApplicationController
  before_action :find_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json { @new_message = @messages.where('id > ?', params[:id]) }
    end
  end

  def create
    @message = @group.messages.new(input_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "Message is blank"
      render "index"
    end
  end

  private

  def find_group
    @group = Group.find(params[:group_id])
    @users_group = current_user.groups
    gon.group = @group[:id]
  end

  def input_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

end
