class MessagesController < ApplicationController
  before_action :find_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(input_params)
    if @message.save
      redirect_to group_messages_path(@group)
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
  end

  def input_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

end
